import axios from 'axios';

import { withApiAuthRequired } from '@auth0/nextjs-auth0';

const expressUrl = process.env.EXPRESS_SERVER_URL;

export default withApiAuthRequired(async function handler(req, res) {
  try {
    const data = req.body.name;
    // if data is array
    if (Array.isArray(data)) {
      await axios.post(`${expressUrl}/postAndReplace`, {
        products: data,
      });
    } else {
      await axios.post(`${expressUrl}/postAndReplace`, {
        products: [data],
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: 'error' });
  }
  res.json({ message: 'success' });
});
