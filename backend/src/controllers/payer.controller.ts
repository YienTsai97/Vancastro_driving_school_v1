import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { getQbo } from "../api/qbo";
import { ensureQuickBooksAuthorization } from "../api/quickbooksAuth";

const prisma = new PrismaClient();

const getPayerById = async (req: Request, res: Response) => {
  try {
    // Fetch payer by id from database
    const dbPayer = await prisma.payer.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    if (!dbPayer) {
      res
        .status(404)
        .json({ success: false, message: "Payer not found in database" });
      return;
    }

    // Ensure QuickBooks authorization
    const tokenData = await ensureQuickBooksAuthorization(req, res);
    if (!tokenData) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    // Fetch the payer by id
    const qbo = await getQbo(tokenData.accessToken, tokenData.refreshToken);
    const quickBooksCustomer = await new Promise((resolve, reject) => {
      qbo.getCustomer(dbPayer.qbCustomerId, (error: Error, response: any) => {
        if (error) {
          console.error("QuickBooks API Error:", error);
          reject(error);
        } else resolve(response);
      });
    });
    if (!quickBooksCustomer) {
      res
        .status(404)
        .json({ success: false, message: "Customer not found in QuickBooks" });
      return;
    }

    res
      .status(200)
      .json({ success: true, data: { dbPayer, quickBooksCustomer } });
  } catch (error) {
    console.error("Error fetching payer by id", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getDbPayerById = async (req: Request, res: Response) => {
  try {
    // Fetch payer by id from database
    const dbPayer = await prisma.payer.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    if (!dbPayer) {
      res
        .status(404)
        .json({ success: false, message: "Payer not found in database" });
      return;
    }

    res.status(200).json({ success: true, data: dbPayer });
  } catch (error) {
    console.error("Error fetching db payer by id", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const createPayer = async (req: Request, res: Response) => {
  let quickBooksCustomer: any = null;

  try {
    const {
      userId,
      firstName,
      lastName,
      email,
      phone,
      streetAddress,
      city,
      province,
      postalCode,
      country,
    } = req.body;
    if (!userId || !firstName || !lastName || !email || !phone) {
      res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
      return;
    }

    // Ensure QuickBooks authorization
    const tokenData = await ensureQuickBooksAuthorization(req, res);
    if (!tokenData) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    // Request data for creating customer in QuickBooks
    const requestData = {
      DisplayName: `${firstName} ${lastName} - #${
        Date.now() + Math.floor(Math.random() * 1000)
      }`,
      PrimaryEmailAddr: {
        Address: email,
      },
      GivenName: firstName,
      FamilyName: lastName,
      PrimaryPhone: {
        FreeFormNumber: phone,
      },
      BillAddr: {
        Line1: streetAddress,
        City: city,
        CountrySubDivisionCode: province,
        PostalCode: postalCode,
        Country: country,
      },
    };

    // Create the customer in QuickBooks
    const qbo = await getQbo(tokenData.accessToken, tokenData.refreshToken);
    quickBooksCustomer = await new Promise((resolve, reject) => {
      qbo.createCustomer(requestData, (error: Error, response: any) => {
        if (error) {
          console.error("QuickBooks API Error:", error);
          reject(error);
        } else resolve(response);
      });
    });

    // Create payer in the database
    const dbPayer = await prisma.payer.create({
      data: {
        userId,
        qbCustomerId: quickBooksCustomer.Id,
        firstName,
        lastName,
        email,
        phone,
        streetAddress,
        city,
        province,
        postalCode,
        country,
      },
    });

    res.status(201).json({
      success: true,
      data: { quickBooksCustomer, dbPayer },
    });
  } catch (error) {
    console.error("Error creating payer", error);

    // Rollback QuickBooks customer if Prisma fails
    if (quickBooksCustomer) {
      console.log("Rolling back QuickBooks customer");

      try {
        // Start to delete the QuickBooks customer
        const tokenData = await ensureQuickBooksAuthorization(req, res);
        if (!tokenData) return;

        // Delete the QuickBooks customer
        const qbo = await getQbo(tokenData.accessToken, tokenData.refreshToken);
        qbo.deleteCustomer(
          {
            Id: quickBooksCustomer.Id,
            SyncToken: quickBooksCustomer.SyncToken,
          },
          (error: Error, response: any) => {
            if (error) {
              console.error("QuickBooks API Error:", error);
              return;
            }
            return response;
          }
        );
      } catch (deleteError) {
        console.error("Failed to delete QuickBooks customer:", deleteError);
      }
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const createPayerInDb = async (req: Request, res: Response) => {
  try {
    const {
      userId,
      firstName,
      lastName,
      email,
      phone,
      streetAddress,
      city,
      province,
      postalCode,
      country,
    } = req.body;
    if (
      !userId ||
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !streetAddress ||
      !city ||
      !province ||
      !postalCode ||
      !country
    ) {
      res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
      return;
    }

    // Create payer in the database
    const dbPayer = await prisma.payer.create({
      data: {
        userId,
        firstName,
        lastName,
        email,
        phone,
        streetAddress,
        city,
        province,
        postalCode,
        country,
      },
    });
    res.status(201).json({
      success: true,
      data: dbPayer,
    });
  } catch (error) {
    console.error("Error creating payer in db", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export default {
  getPayerById,
  getDbPayerById,
  createPayer,
  createPayerInDb,
};
