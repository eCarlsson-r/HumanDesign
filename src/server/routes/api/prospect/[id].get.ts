import { defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => {
  const id = event.context.params!['id'];

  const report = await $fetch(
    `${import.meta.env['VITE_API_URL']}/prospects${id}/report`
  );

  return report;
});
