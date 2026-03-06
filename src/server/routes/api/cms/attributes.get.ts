import { defineEventHandler, getHeader, getQuery } from 'h3';

export default defineEventHandler(async (event) => {
  const property = getQuery(event)['property'];
  const token = getHeader(event, 'authorization');

  let selectedType = "";
  switch(property) {
    case "Type":
      selectedType = "type";
      break;
    case "Profile":
      selectedType = "profile";
      break;
    case "Gate":
      selectedType = "gate";
      break;
    case "Channel":
      selectedType = "channel";
      break;
    case "Center":
      selectedType = "center";
      break;
    case "Cross":
      selectedType = "cross";
      break;
    default:
      selectedType = "attributes";
      break;
  }

  const report = await $fetch(
    `${import.meta.env['VITE_API_URL']}/cms/${selectedType}`,
    {
      headers: {
        authorization: `Bearer ${token}`
      }
    }
  );

  return report;
});
