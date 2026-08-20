let QuickBooks = require("node-quickbooks");

export const getQbo = async (accessToken: string, refreshToken: string) => {
  let qbo = new QuickBooks(
    process.env.QUICKBOOKS_CLIENT_ID,
    process.env.QUICKBOOKS_CLIENT_SECRET,
    accessToken,
    false, // no token secret for oAuth 2.0
    process.env.QUICKBOOKS_REALM_ID,
    process.env.QUICKBOOKS_ENV, // 'sandbox' or 'production'
    true, // enable debugging?
    null, // set minorversion, or null for the latest version
    "2.0", //oAuth version
    refreshToken
  );
  return qbo;
};

type QboClient = Awaited<ReturnType<typeof getQbo>>;

function qboRequest<T>(run: (cb: (error: any, response: T) => void) => void): Promise<T> {
  return new Promise((resolve, reject) => {
    run((error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
}

function isDuplicateNameError(error: any): boolean {
  const fault = error?.response?.data?.Fault?.Error?.[0];
  const message = fault?.Message || error?.message || "";
  return fault?.code === "6240" || /duplicate name exists/i.test(String(message));
}

function queryRecords<T>(response: any, key: string): T[] {
  const records = response?.QueryResponse?.[key];
  if (!records) return [];
  return Array.isArray(records) ? records : [records];
}

export async function findOrCreateQbCustomer(
  qbo: QboClient,
  payer: {
    firstName: string;
    lastName: string;
    email: string | null;
    phone: string | null;
  }
): Promise<string> {
  const displayName = `${payer.firstName} ${payer.lastName}`.trim();
  const email = (payer.email || "").trim().toLowerCase();

  const existingResponse = await qboRequest<any>((cb) =>
    qbo.findCustomers({ fetchAll: true }, cb)
  );
  const existing = queryRecords<any>(existingResponse, "Customer").find((customer) => {
    const customerEmail = String(customer?.PrimaryEmailAddr?.Address || "").toLowerCase();
    const customerName = String(customer?.DisplayName || "");
    return (
      (email && customerEmail === email) ||
      customerName === displayName ||
      customerName.startsWith(`${displayName} - #`)
    );
  });
  if (existing?.Id) return String(existing.Id);

  try {
    const created = await qboRequest<any>((cb) =>
      qbo.createCustomer(
        {
          DisplayName: `${displayName} - #${Date.now()}`,
          GivenName: payer.firstName,
          FamilyName: payer.lastName,
          PrimaryPhone: payer.phone ? { FreeFormNumber: payer.phone } : undefined,
          PrimaryEmailAddr: payer.email ? { Address: payer.email } : undefined,
        },
        cb
      )
    );
    return String(created.Id);
  } catch (error) {
    if (!isDuplicateNameError(error)) throw error;
    const retryResponse = await qboRequest<any>((cb) =>
      qbo.findCustomers({ fetchAll: true }, cb)
    );
    const retry = queryRecords<any>(retryResponse, "Customer").find((customer) => {
      const customerEmail = String(customer?.PrimaryEmailAddr?.Address || "").toLowerCase();
      return email && customerEmail === email;
    });
    if (retry?.Id) return String(retry.Id);
    throw error;
  }
}

export async function findOrCreateQbServiceItem(
  qbo: QboClient,
  name: string,
  unitPrice: number
): Promise<string> {
  const existingResponse = await qboRequest<any>((cb) =>
    qbo.findItems({ fetchAll: true }, cb)
  );
  const existing = queryRecords<any>(existingResponse, "Item").find(
    (item) => String(item?.Name || "").toLowerCase() === name.toLowerCase()
  );
  if (existing?.Id) return String(existing.Id);

  try {
    const created = await qboRequest<any>((cb) =>
      qbo.createItem(
        {
          Name: name,
          Type: "Service",
          IncomeAccountRef: {
            value: process.env.QUICKBOOKS_INCOME_ACCOUNT_ID || "79",
          },
          UnitPrice: unitPrice,
        },
        cb
      )
    );
    return String(created.Id);
  } catch (error) {
    if (!isDuplicateNameError(error)) throw error;
    const retryResponse = await qboRequest<any>((cb) =>
      qbo.findItems({ fetchAll: true }, cb)
    );
    const retry = queryRecords<any>(retryResponse, "Item").find(
      (item) => String(item?.Name || "").toLowerCase() === name.toLowerCase()
    );
    if (retry?.Id) return String(retry.Id);
    throw error;
  }
}
