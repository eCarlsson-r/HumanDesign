import { defineEventHandler, getHeader, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const token = getHeader(event, 'authorization');
  const id = event.context.params!['id'];

  const report = await $fetch(
    `${import.meta.env['VITE_API_URL']}/cms/profile/${id}`, {
      method: 'PUT',
      body,
      headers: {
        authorization: `Bearer ${token}`
      }
    }
  );

  return report;
});
