import { replacePhotos } from '../../mongodb/dbFunctions';
import { getPrice } from '../../puppeteer/puppeteerFunctions';
const handler = async (req, res) => {
  const photos = await getPrice();
  await replacePhotos(photos);
  res.status(200).json({ name: 'John Doe' });
};

export default handler;
