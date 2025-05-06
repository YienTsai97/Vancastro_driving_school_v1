'use server';

import { auth } from '@clerk/nextjs/server';

/**
 * Get QuickBooks auth URI to redirect user to QuickBooks login page
 */
export const getAuthUri = async (): Promise<string> => {
  try {
    // Get clerk id
    const { userId } = await auth();
    if (!userId) {
      throw new Error('User not authenticated');
    }

    const response = await fetch(
      `${process.env.API_URL}/api/v1/oauth/authUri`,
      {
        method: 'GET',
        headers: {
          'X-Clerk-User-Id': userId,
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Error getting auth URI: ${response.statusText}`);
    }
    return await response.text();
  } catch (error) {
    console.error('Error getting auth URI:', error);
    throw error;
  }
};
