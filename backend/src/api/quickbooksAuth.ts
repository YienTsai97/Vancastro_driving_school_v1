const OAuthClient = require('intuit-oauth');
import { getAuth } from '@clerk/express';
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

type OAuthTokenType = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  x_refresh_token_expires_in: number;
};

export const oauthClient = new OAuthClient({
  clientId: process.env.QUICKBOOKS_CLIENT_ID,
  clientSecret: process.env.QUICKBOOKS_CLIENT_SECRET,
  environment: process.env.QUICKBOOKS_ENV,
  redirectUri: process.env.QUICKBOOKS_REDIRECT_URI,
});

export const getAuthUri = (clerkId: string) => {
  return oauthClient.authorizeUri({
    scope: [OAuthClient.scopes.Accounting, OAuthClient.scopes.OpenId],
    state: clerkId, // Set the clerkId as state to retrieve it in the callback
  }); // can be an array of multiple scopes ex : {scope:[OAuthClient.scopes.Accounting,OAuthClient.scopes.OpenId]}
};

export const getAuthTokens = async (req: Request): Promise<OAuthTokenType> => {
  try {
    // Parse the URL to get the tokens
    const parseRedirect = req.url;

    // Retrieve the tokens from the URL
    const authResponse = await oauthClient.createToken(parseRedirect);
    const authToken: string = JSON.stringify(authResponse.getJson());

    // Parse the auth token to object
    const parsedAuthToken: OAuthTokenType = JSON.parse(authToken);

    return parsedAuthToken;
  } catch (error) {
    console.error('Error getting token:', (error as Error).message);
    throw new Error('Failed to get QuickBooks token');
  }
};

export const refreshAuthToken = async (prevToken: string) => {
  try {
    const authResponse = await oauthClient.refreshUsingToken(prevToken);
    const authToken: string = JSON.stringify(authResponse.getJson());
    const parsedAuthToken: OAuthTokenType = JSON.parse(authToken);
    return parsedAuthToken;
  } catch (error) {
    console.error('Error refreshing token:', (error as Error).message);
    throw new Error('Failed to refresh QuickBooks token');
  }
};

export const ensureQuickBooksAuthorization = async (
  req: Request,
  res: Response
): Promise<{ accessToken: string; refreshToken: string } | undefined> => {
  try {
    // Get the clerkId from the request headers
    const { userId: clerkId } = await getAuth(req);
    if (!clerkId) {
      throw new Error('User not authenticated');
    }

    // Get the user by clerk id from the database
    const user = await prisma.user.findUnique({
      where: { clerkId: clerkId?.toString() },
    });
    if (!user) {
      throw new Error('User not found');
    }

    const {
      qbAccessToken,
      qbAccessTokenExpiresAt,
      qbRefreshToken,
      qbRefreshTokenExpiresAt,
    } = user;

    if (
      !qbAccessToken ||
      !qbAccessTokenExpiresAt ||
      !qbRefreshToken ||
      !qbRefreshTokenExpiresAt ||
      qbRefreshTokenExpiresAt < new Date()
    ) {
      // Let the user know that they need to re-authenticate if the refresh token is expired

      res.json({
        needReAuth: true,
        message: 'Your QuickBooks token has expired. Please re-authenticate.',
      });
      return;
    } else if (qbAccessTokenExpiresAt < new Date()) {
      // Refresh the token if the access token is expired

      const newToken = await refreshAuthToken(qbRefreshToken);

      // Update the database with the new tokens
      const updatedUser = await prisma.user.update({
        where: { clerkId: clerkId?.toString() },
        data: {
          qbAccessToken: newToken.access_token,
          qbAccessTokenExpiresAt: new Date(
            Date.now() + newToken.expires_in * 1000
          ),
          qbRefreshToken: newToken.refresh_token,
          qbRefreshTokenExpiresAt: new Date(
            Date.now() + newToken.x_refresh_token_expires_in * 1000
          ),
        },
      });
      if (!updatedUser) {
        throw new Error('Failed to update user tokens');
      }

      return {
        accessToken: newToken.access_token,
        refreshToken: newToken.refresh_token,
      };
    } else {
      // Return the existing tokens if they are still valid

      return {
        accessToken: qbAccessToken,
        refreshToken: qbRefreshToken,
      };
    }
  } catch (error) {
    console.error('Error getting QuickBooks token:', error);
    throw new Error('Internal server error');
  }
};
