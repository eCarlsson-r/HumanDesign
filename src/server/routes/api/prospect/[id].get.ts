import { defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => {
  const id = event.context.params!['id'];

  const report = await $fetch(
    `http://localhost:5016/api/prospects/${id}/report`
  );

  return report;
});
