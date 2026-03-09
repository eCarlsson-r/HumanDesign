import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // TODO: call C# backend
  const response = await $fetch(`${process.env['VITE_API_URL']}/auth/login`, {
    method: 'POST',
    body
  });

  return response;
});
