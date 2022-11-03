import axios from 'axios';
const handler = async (req, res) => {
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
};

export default handler;
