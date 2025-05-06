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
