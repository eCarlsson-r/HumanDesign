import { createError, defineEventHandler, getHeader } from 'h3';

export default defineEventHandler(async (event) => {
  const token = getHeader(event, 'authorization');

  try {
    const report = await $fetch(
      `${import.meta.env['VITE_API_URL']}/dashboard/stats`,
      {
        headers: {
          authorization: `Bearer ${token}`
        }
      }
    );

    return report;
  } catch (error: any) {
    // Check if the error from the API is a 401
    if (error.response?.status === 401) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized',
        message: 'Invalid or expired token',
      });
    }
    // Re-throw other errors
    throw error;
  }
});
