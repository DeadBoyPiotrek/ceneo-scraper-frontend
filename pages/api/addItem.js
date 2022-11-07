import axios from 'axios';

import { withApiAuthRequired } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function handler(req, res) {
  try {
    const data = req.body.name;
    // if data is array
    if (Array.isArray(data)) {
      await axios.post(`http://localhost:3000/postAndReplace`, {
        products: data,
      });
    } else {
      await axios.post(`http://localhost:3000/postAndReplace`, {
        products: [data],
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: 'error' });
  }
  res.json({ message: 'success' });
});

// const handler = async (req, res) => {
//   try {
//     const data = req.body.name;
//     // if data is array
//     if (Array.isArray(data)) {
//       await axios.post(`http://localhost:3000/postAndReplace`, {
//         products: data,
//       });
//     } else {
//       await axios.post(`http://localhost:3000/postAndReplace`, {
//         products: [data],
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res.json({ message: 'error' });
//   }
//   res.json({ message: 'success' });
// };

// export default handler;
