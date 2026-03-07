import { defineEventHandler, getHeader, getQuery } from 'h3';

export default defineEventHandler(async (event) => {
  const search = getQuery(event)['search'];
  const page = getQuery(event)['page'];
  const pageSize = getQuery(event)['pageSize'];
  const token = getHeader(event, 'authorization');

  const report = await $fetch(
    `${import.meta.env['VITE_API_URL']}/prospects?search=${search}&page=${page}&pageSize=${pageSize}`,
    {
      headers: {
        authorization: `Bearer ${token}`
      }
    }
  );

  return report;
});
