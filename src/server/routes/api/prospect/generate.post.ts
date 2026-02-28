import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // TODO: call C# backend
  const response = await $fetch('http://localhost:5016/api/prospects', {
    method: 'POST',
    body
  });

  return response;
});
