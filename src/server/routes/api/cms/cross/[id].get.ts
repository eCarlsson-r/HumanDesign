import { defineEventHandler, getHeader } from 'h3';

export default defineEventHandler(async (event) => {
  const token = getHeader(event, 'authorization');
  const id = event.context.params!['id'];

  const report = await $fetch(
    `${import.meta.env['VITE_API_URL']}/cms/cross/${id}`,
    {
      headers: {
        authorization: `Bearer ${token}`
      }
    }
  );

  return report;
});
