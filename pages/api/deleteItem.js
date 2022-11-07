import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import axios from 'axios';
export default withApiAuthRequired(async function handler(req, res) {
  try {
    const name = req.body.name;
    await axios.post(`http://localhost:3000/deleteData`, {
      products: [name],
    });
  } catch (error) {
    console.log(error);
    res.json({ message: 'error' });
  }
  res.json({ message: 'success' });
});

// export default handler;
