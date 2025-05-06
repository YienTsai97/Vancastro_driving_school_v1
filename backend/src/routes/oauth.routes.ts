import { PrismaClient } from '@prisma/client';
import { Request, Response, Router } from 'express';
import { getAuthTokens, getAuthUri } from '../api/quickbooksAuth';


const prisma = new PrismaClient();

export const oauthRouter = Router();

oauthRouter.get('/authUri', (req: Request, res: Response) => {
  // Get the clerkId from the request headers
  const clerkId = req.headers['x-clerk-user-id'] as string;
  if (!clerkId) {
    res.status(401).send('User not authenticated');
    return;
  }

  res.send(getAuthUri(clerkId));
});

oauthRouter.get('/callback', async (req: Request, res: Response) => {
  try {
    // Parse the URL to get the auth code
    const parseRedirect = req.url;
    // Get the clerkId from the state parameter
    const clerkId = parseRedirect.split('state=')[1].split('&')[0] as string;

    // Retrieve the tokens from the URL
    const authToken = await getAuthTokens(req);

    // Save the token to the database
    const newUser = await prisma.user.update({
      where: { clerkId },
      data: {
        qbAccessToken: authToken.access_token,
        qbAccessTokenExpiresAt: new Date(
          authToken.expires_in * 1000 + Date.now() // Access token expires in 1 hour
        ),
        qbRefreshToken: authToken.refresh_token,
        qbRefreshTokenExpiresAt: new Date(
          authToken.x_refresh_token_expires_in * 1000 + Date.now() // Refresh token expires in roughly 100 days
        ),
      },
    });
    if (!newUser) {
      res.status(404).send('User not found');
      return;
    }

    res.redirect(
      `${process.env.FRONTEND_URL}${process.env.FRONTEND_REDIRECT_PATH}`
    );
  } catch (error) {
    console.error('Error getting token:', (error as Error).message);
  }
});

// サービス/商品一覧を取得するエンドポイント
oauthRouter.get('/services', async (req: Request, res: Response) => {
  try {
    const clerkId = req.headers['x-clerk-user-id'] as string;
    if (!clerkId) {
      res.status(401).send('User not authenticated');
      return;
    }

    const user = await prisma.user.findUnique({ where: { clerkId } });
    if (!user || !user.qbAccessToken) {
      res.status(404).send('QuickBooks tokens not found for user');
      return;
    }

    const response = await fetch(
      `https://sandbox-quickbooks.api.intuit.com/v3/company/${process.env.QUICKBOOKS_REALM_ID}/query?query=select * from Item&minorversion=3`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.qbAccessToken}`,
          'Content-Type': 'application/json',
          Accept: 'application/json', 
        },
      }
    );

    const rawResponse = await response.text();


    if (!response.ok) {
      console.error('QuickBooks API error:', rawResponse);
      res.status(response.status).send('Failed to fetch services from QuickBooks');
      return;
    }

    try {
      const data = JSON.parse(rawResponse);
      res.json(data);
    } catch (error) {
      console.error('Failed to parse JSON:');
      res.status(500).send('Invalid response from QuickBooks API');
    }
  } catch (error) {
    console.error('Error fetching services:', (error as Error).message);
    res.status(500).send('Internal server error');
  }
});