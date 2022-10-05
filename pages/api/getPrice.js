import { replacePhotos } from '../../mongodb/dbFunctions';
import { getPrice } from '../../puppeteer/puppeteerFunctions';
const handler = async (req, res) => {
  const photos = await getPrice(req, res);
  // console.log('photos', photos);
  const photos2 = {
    photo1dot2: 'lol',
    photo2dot2: 'lol2',
  };
  await replacePhotos(photos);
  res
    .status(200)
    .json({ name: ' I guess, puppeteer and mongodb worked somehow 😮' });
};

export default handler;
