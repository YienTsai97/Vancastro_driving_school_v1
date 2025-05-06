import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { getQbo } from "../api/qbo";
import { ensureQuickBooksAuthorization } from "../api/quickbooksAuth";

const prisma = new PrismaClient();

const include = {
  lessons: {
    include: {
      student: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      instructor: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      lessonType: {
        select: {
          id: true,
          qbServiceId: true,
          lessonName: true,
          price: true,
          lessonLength: true,
        },
      },
    },
  },
  invoiceTransactions: true,
  user: {
    select: {
      firstName: true,
      lastName: true,
    },
  },
  purchase: {
    include: {
      payer: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  },
};

const getInvoices = async (req: Request, res: Response) => {
  try {
    const invoices = await prisma.invoice.findMany({
      include: include,
    });
    res.status(200).json({ success: true, data: invoices });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getInvoiceById = async (req: Request, res: Response) => {
  try {
    // Fetch invoice by id from the database
    const dbInvoice = await prisma.invoice.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: include,
    });
    if (!dbInvoice) {
      res
        .status(404)
        .json({ success: false, message: "Invoice not found in database" });
      return;
    }

    // Ensure QuickBooks authorization
    const tokenData = await ensureQuickBooksAuthorization(req, res);
    if (!tokenData) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    // Fetch invoice by id from QuickBooks
    const qbo = await getQbo(tokenData.accessToken, tokenData.refreshToken);
    const quickBooksInvoice = await new Promise((resolve, reject) => {
      qbo.getInvoice(dbInvoice.qbInvoiceId, (error: Error, response: any) => {
        if (error) {
          console.error("QuickBooks API Error:", error);
          reject(error);
        } else resolve(response);
      });
    });
    if (!quickBooksInvoice) {
      res
        .status(404)
        .json({ success: false, message: "Invoice not found in QuickBooks" });
      return;
    }

    res
      .status(200)
      .json({ success: true, data: { dbInvoice, quickBooksInvoice } });
  } catch (error) {
    console.error("Error fetching invoice by id", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getInvoicesByUserId = async (req: Request, res: Response) => {
  try {
    const invoices = await prisma.invoice.findMany({
      where: {
        userId: Number(req.params.id),
      },
      include: include,
    });
    if (!invoices) {
      res
        .status(404)
        .json({ success: false, message: "Invoices not found in database" });
      return;
    }
    res.status(200).json({ success: true, data: invoices });
  } catch (error) {
    console.error("Error fetching invoices by user id", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const createInvoice = async (req: Request, res: Response) => {
  let quickBooksInvoice: any = null;

  try {
    const {
      userId,
      purchaseId,
      status,
      lessonCount,
      invoiceNumber,
      lessonItems,
      totalAmount,
      dueDate,
      discountPercent,
    } = req.body;
    if (
      !userId ||
      !purchaseId ||
      !status ||
      lessonCount === undefined ||
      !invoiceNumber ||
      !lessonItems ||
      !totalAmount ||
      !dueDate
    ) {
      res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
      return;
    }

    // Get purchase data
    const purchase = await prisma.purchase.findUnique({
      where: { id: Number(purchaseId) },
      include: {
        payer: true,
      },
    });
    if (!purchase) {
      res.status(404).json({ success: false, message: "Purchase not found" });
      return;
    }

    // Ensure QuickBooks authorization
    const tokenData = await ensureQuickBooksAuthorization(req, res);
    if (!tokenData) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    let qbCustomerIdToUse = purchase.payer.qbCustomerId;

    // Create customer in QuickBooks and add id to payer data in database if not exists
    if (!purchase.payer.qbCustomerId) {
      const qbo = await getQbo(tokenData.accessToken, tokenData.refreshToken);
      const customerData = {
        DisplayName: `${purchase.payer.firstName} ${
          purchase.payer.lastName
        } - #${Date.now() + Math.floor(Math.random() * 1000)}`,
        GivenName: purchase.payer.firstName,
        FamilyName: purchase.payer.lastName,
        PrimaryPhone: {
          FreeFormNumber: purchase.payer.phone,
        },
        PrimaryEmailAddr: {
          Address: purchase.payer.email,
        },
      };
      const customer = (await new Promise((resolve, reject) => {
        qbo.createCustomer(customerData, (error: Error, response: any) => {
          if (error) {
            console.error("QuickBooks API Error:", error);
            reject(error);
          } else resolve(response);
        });
      })) as any;

      await prisma.payer.update({
        where: { id: purchase.payer.id },
        data: { qbCustomerId: customer.Id },
      });

      qbCustomerIdToUse = customer.Id;
    }

    // Prepare items data

    // Get lesson type data in database
    const lessonTypes = await prisma.lessonType.findMany({});
    if (lessonTypes.length === 0) {
      res
        .status(404)
        .json({ success: false, message: "Fetch lesson type failed" });
      return;
    }

    // Prepare items to use for QuickBooks
    const lessonItemsToUse: {
      qbServiceId: string;
      amount: number;
      quantity: number;
    }[] = await Promise.all(
      lessonItems.map(
        async (item: { id: number; amount: number; quantity: number }) => {
          const lessonType = lessonTypes.find(
            (lessonType) => lessonType.id === item.id
          );
          if (!lessonType) {
            throw new Error("Invalid lesson type id included");
          }

          let qbServiceIdToUse = lessonType.qbServiceId;

          // Create service item in QuickBooks and add id to lesson type data in database if not exists
          if (!lessonType.qbServiceId) {
            const qbo = await getQbo(
              tokenData.accessToken,
              tokenData.refreshToken
            );
            const serviceItemData = {
              Name: `${lessonType.licenseClass.replace("_", " ")} ${
                lessonType.lessonName
              }`,
              Type: "Service",
              IncomeAccountRef: { value: "79" },
              UnitPrice: lessonType.price,
            };
            const serviceItem = (await new Promise((resolve, reject) => {
              qbo.createItem(serviceItemData, (error: Error, response: any) => {
                if (error) {
                  console.error("QuickBooks API Error:", error);
                  reject(error);
                } else {
                  resolve(response);
                }
              });
            })) as any;

            await prisma.lessonType.update({
              where: { id: lessonType.id },
              data: { qbServiceId: serviceItem.Id },
            });

            qbServiceIdToUse = serviceItem.Id;
          }

          return {
            qbServiceId: qbServiceIdToUse,
            amount: item.amount,
            quantity: item.quantity,
          };
        }
      )
    );

    // Request data for creating invoice in QuickBooks
    const requestData = {
      Line: [
        // Map lesson items to QuickBooks invoice line items
        ...lessonItemsToUse.map((item) => ({
          DetailType: "SalesItemLineDetail",
          Amount: item.amount * item.quantity, // total amount = unit price * quantity
          SalesItemLineDetail: {
            ItemRef: {
              value: item.qbServiceId,
            },
            TaxCodeRef: { value: "3" }, // Example tax code
            Qty: item.quantity,
            UnitPrice: item.amount, // single unit price
          },
        })),

        // Add discount only if greater than 0
        ...(discountPercent > 0
          ? [
              {
                DetailType: "DiscountLineDetail",
                DiscountLineDetail: {
                  DiscountAccountRef: { value: "87" }, // Sales Discounts Account
                  PercentBased: true,
                  DiscountPercent: discountPercent,
                },
              },
            ]
          : []),
      ],
      CustomerRef: {
        value: qbCustomerIdToUse, // Replace with a valid Customer ID from QuickBooks
      },
      TxnTaxDetail: {
        TxnTaxCodeRef: { value: "3" }, // Ensure this tax code exists
      },
      DocNumber: invoiceNumber,
      DueDate: dueDate,
    };

    // Create invoice in QuickBooks
    const qbo = await getQbo(tokenData.accessToken, tokenData.refreshToken);
    quickBooksInvoice = await new Promise((resolve, reject) => {
      qbo.createInvoice(requestData, (error: Error, response: any) => {
        if (error) {
          console.error("QuickBooks API Error:", error);
          reject(error);
        } else resolve(response);
      });
    });

    // Create invoice in the database
    const dbInvoice = await prisma.invoice.create({
      data: {
        userId,
        purchaseId,
        qbInvoiceId: quickBooksInvoice.Id,
        status,
        lessonCount,
        invoiceNumber,
        totalAmount,
        invoiceDate: new Date(),
        dueDate: new Date(dueDate),
        discountPercent,
      },
      include: include,
    });

    res.status(200).json({
      success: true,
      data: {
        quickBooksInvoice: quickBooksInvoice,
        dbInvoice: dbInvoice,
      },
    });
  } catch (error) {
    console.error("Error creating invoice", error);

    // Rollback QuickBooks Invoice if Prisma fails
    if (quickBooksInvoice) {
      console.log(`Rolling back QuickBooks Invoice`);

      try {
        // Start to delete the QuickBooks invoice
        const tokenData = await ensureQuickBooksAuthorization(req, res);
        if (!tokenData) return;

        // Delete the QuickBooks invoice
        const qbo = await getQbo(tokenData.accessToken, tokenData.refreshToken);
        qbo.deleteInvoice(
          { Id: quickBooksInvoice.Id, SyncToken: quickBooksInvoice.SyncToken },
          (error: Error, response: any) => {
            if (error) {
              console.error("QuickBooks API Error:", error);
              return;
            }
            return response;
          }
        );
      } catch (deleteError) {
        console.error(`Failed to delete QuickBooks invoice:`, deleteError);
      }
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// const editInvoiceInDatabase = async (req: Request, res: Response) => {
//   try {
//     const { status, lessonCount } = req.body;

//     // Check if the invoice exists
//     const existInvoice = await prisma.invoice.findUnique({
//       where: {
//         id: Number(req.params.id),
//       },
//     });
//     if (!existInvoice) {
//       res.status(404).json({ success: false, message: "Invoice not found" });
//       return;
//     }

//     // Update the invoice
//     const editedInvoice = await prisma.invoice.update({
//       where: {
//         id: Number(req.params.id),
//       },
//       data: {
//         status,
//         lessonCount,
//       },
//       include: include,
//     });

//     res.status(200).json({ success: true, data: editedInvoice });
//   } catch (error) {
//     console.error("Error updating invoice", error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };

const editInvoice = async (req: Request, res: Response) => {
  try {
    const { status, lessonCount, totalAmount, dueDate, discountPercent } =
      req.body;

    // Only update database invoice and return if only status and lessonCount are provided
    if (!totalAmount && !dueDate && !discountPercent) {
      const dbInvoice = await prisma.invoice.update({
        where: {
          id: Number(req.params.id),
        },
        data: {
          status,
          lessonCount,
        },
        include: include,
      });
      if (!dbInvoice) {
        res.status(404).json({ success: false, message: "Invoice not found" });
        return;
      }
      res.status(200).json({ success: true, data: dbInvoice });
      return;
    }

    // Ensure QuickBooks authorization
    const tokenData = await ensureQuickBooksAuthorization(req, res);
    if (!tokenData) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    await prisma.$transaction(async (prisma) => {
      // Update invoice in the database
      const dbInvoice = await prisma.invoice.update({
        where: {
          id: Number(req.params.id),
        },
        data: {
          status,
          lessonCount,
          totalAmount,
          dueDate: new Date(dueDate),
          discountPercent,
        },
        include: include,
      });
      if (!dbInvoice) {
        res.status(404).json({ success: false, message: "Invoice not found" });
        return;
      }

      // Check if the invoice exists
      const qbo = await getQbo(tokenData.accessToken, tokenData.refreshToken);
      const existInvoice = (await new Promise((resolve, reject) => {
        qbo.getInvoice(dbInvoice.qbInvoiceId, (error: Error, response: any) => {
          if (error) {
            console.error("QuickBooks API Error (Fetching):", error);
            reject(error);
          } else resolve(response);
        });
      })) as any;

      if (!existInvoice) {
        res
          .status(404)
          .json({ success: false, message: "Invoice not found in QuickBooks" });
        return;
      }

      const itemRefValue =
        existInvoice.Line?.[0]?.SalesItemLineDetail?.ItemRef?.value;

      // Request data for updating lesson in QuickBooks
      const requestData = {
        Id: existInvoice.Id,
        SyncToken: existInvoice.SyncToken,
        Line: [
          {
            DetailType: "SalesItemLineDetail",
            Amount: totalAmount || existInvoice.Line?.[0]?.Amount,
            SalesItemLineDetail: {
              ItemRef: {
                value: itemRefValue, // Replace with a valid Item ID from QuickBooks
              },
              TaxCodeRef: { value: "3" }, // Replace with a valid Tax Code ID
            },
          },

          // Update discount if exists
          ...(discountPercent && discountPercent >= 0
            ? [
                {
                  DetailType: "DiscountLineDetail",
                  DiscountLineDetail: {
                    DiscountAccountRef: { value: "87" }, // Sales Discounts Account
                    PercentBased: true,
                    DiscountPercent: discountPercent,
                  },
                },
              ]
            : existInvoice.Line?.[2]
            ? [
                {
                  DetailType: "DiscountLineDetail",
                  DiscountLineDetail: {
                    DiscountAccountRef: { value: "87" }, // Sales Discounts Account
                    PercentBased: true,
                    DiscountPercent:
                      existInvoice.Line?.[2]?.DiscountLineDetail
                        ?.DiscountPercent,
                  },
                },
              ]
            : []),
        ],
        TxnTaxDetail: {
          TxnTaxCodeRef: { value: "3" }, // Ensure this tax code exists
        },
        DueDate: dueDate || existInvoice.DueDate,
        DocNumber: existInvoice.DocNumber,
      };

      // Update lesson in QuickBooks
      const quickBooksInvoice = await new Promise((resolve, reject) => {
        qbo.updateInvoice(requestData, (error: Error, response: any) => {
          if (error) {
            console.error("QuickBooks API Error:", error);
            reject(error);
          }
          resolve(response);
        });
      });

      res.status(200).json({
        success: true,
        data: {
          quickBooksInvoice,
          dbInvoice,
        },
      });
    });
  } catch (error) {
    console.error("Error updating invoice in QuickBooks", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const deleteInvoice = async (req: Request, res: Response) => {
  try {
    let deletedInvoice: any = null;

    await prisma.$transaction(async (prisma) => {
      // Delete invoice from the database
      deletedInvoice = await prisma.invoice.delete({
        where: {
          id: Number(req.params.id),
        },
      });

      // Ensure QuickBooks authorization
      const tokenData = await ensureQuickBooksAuthorization(req, res);
      if (!tokenData) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        return;
      }

      // Check if the invoice exists in QuickBooks
      const qbo = await getQbo(tokenData.accessToken, tokenData.refreshToken);
      const existInvoice = (await new Promise((resolve, reject) => {
        qbo.getInvoice(
          deletedInvoice.qbInvoiceId,
          (error: Error, response: any) => {
            if (error) {
              console.error("QuickBooks API Error:", error);
              reject(error);
            } else resolve(response);
          }
        );
      })) as any;
      if (!existInvoice) {
        res
          .status(404)
          .json({ success: false, message: "Invoice not found in QuickBooks" });
        return;
      }

      // Delete invoice from QuickBooks
      await new Promise((resolve, reject) => {
        qbo.deleteInvoice(
          {
            Id: deletedInvoice.qbInvoiceId,
            SyncToken: existInvoice.SyncToken,
          },
          (error: Error, response: any) => {
            if (error) {
              console.error("QuickBooks API Error:", error);
              reject(error);
            } else resolve(response);
          }
        );
      });
    });

    res.status(200).json({
      success: true,
      data: {
        invoiceId: deletedInvoice.id,
        qbInvoiceId: deletedInvoice.qbInvoiceId,
      },
    });
  } catch (error) {
    console.error("Error deleting invoice", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export default {
  getInvoices,
  getInvoiceById,
  getInvoicesByUserId,
  createInvoice,
  // editInvoiceInDatabase,
  editInvoice,
  deleteInvoice,
};
