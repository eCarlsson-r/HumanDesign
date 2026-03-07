import { defineEventHandler, getHeader } from 'h3';

export default defineEventHandler(async (event) => {
  const token = getHeader(event, 'authorization');

  const report = await $fetch(
    `${import.meta.env['VITE_API_URL']}/crm/users/leaders`,
    {
      headers: {
        authorization: `Bearer ${token}`
      }
    }
  );

  return report;
});
