import { uploadScreenshots } from '../../mongodb/dbFunctions';

const handler = async (req, res) => {
  uploadScreenshots({ image: 'some-image' });
  res.status(200).json({ name: 'John Doe' });
};

export default handler;
