import { Request, Response } from 'express';
import { getQbo } from '../api/qbo';
import { ensureQuickBooksAuthorization } from '../api/quickbooksAuth';

const getCustomerById = async (req: Request, res: Response) => {
  try {
    // Ensure QuickBooks authorization
    const tokenData = await ensureQuickBooksAuthorization(req, res);
    if (!tokenData) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    // Fetch the customer by id
    const qbo = await getQbo(tokenData.accessToken, tokenData.refreshToken);
    const customer = await new Promise((resolve, reject) => {
      qbo.getCustomer(req.params.id, (error: Error, response: any) => {
        if (error) {
          console.error('QuickBooks API Error:', error);
          reject(error);
        } else resolve(response);
      });
    });
    if (!customer) {
      res.status(404).json({ success: false, message: 'Customer not found' });
    }

    res.status(200).json({ success: true, data: customer });
  } catch (error) {
    console.error('Error fetching customer by id', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const createCustomer = async (req: Request, res: Response) => {
  try {
    const {
      firstname,
      lastname,
      email,
      phone,
      streetAddress,
      city,
      province,
      postalCode,
      country,
    } = req.body;
    if (
      !firstname ||
      !lastname ||
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
        .json({ success: false, message: 'Missing required fields' });
      return;
    }

    // Ensure QuickBooks authorization
    const tokenData = await ensureQuickBooksAuthorization(req, res);
    if (!tokenData) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    // Prepare the request data
    const requestData = {
      DisplayName: `${firstname} ${lastname}`,
      PrimaryEmailAddr: {
        Address: email,
      },
      GivenName: firstname,
      FamilyName: lastname,
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

    // Create the customer
    const qbo = await getQbo(tokenData.accessToken, tokenData.refreshToken);
    const newCustomer = await new Promise((resolve, reject) => {
      qbo.createCustomer(requestData, (error: Error, response: any) => {
        if (error) {
          console.error('QuickBooks API Error:', error);
          reject(error);
        } else resolve(response);
      });
    });

    res.status(201).json({ success: true, data: newCustomer });
  } catch (error) {
    console.error('Error creating customer', error);
    res.status(500).json({ success: false, message: 'Internal sever error' });
  }
};

export default {
  getCustomerById,
  createCustomer,
};
