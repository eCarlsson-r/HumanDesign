import { defineEventHandler, getQuery, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // TODO: call C# backend
  const response = await $fetch(`${import.meta.env['VITE_API_URL']}/prospects?referrer=${getQuery(event)['referrer']}`, {
    method: 'POST',
    body
  });

  return response;
});
