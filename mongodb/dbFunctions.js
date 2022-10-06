import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI;
const options = {};
const client = new MongoClient(uri, options);
const clientPromise = client.connect();

//! not really needed in prod :)
// export const uploadScreenshots = async data => {
//   try {
//     const client = await clientPromise;
//     const db = await client.db();

//     db.collection('images').insertOne(data);
//   } catch (err) {
//     console.error('error !!!!!!!', err);
//   }
// };

// export const deleteAll = async () => {
//   try {
//     const client = await clientPromise;
//     const db = await client.db();
//     db.collection('images').deleteMany({});
//   } catch (err) {
//     console.error('error !!!', err);
//   }
// };
//! not really needed in prod:)

export const getData = async () => {
  try {
    const client = await clientPromise;
    const db = await client.db();
    const data = await db.collection('images').find({}).toArray();
    const images = await JSON.parse(JSON.stringify(data));
    return images;
  } catch (e) {
    console.log('eeeee:', e);
    return e?.message;
  }
};

export const replaceScreenshots = async data => {
  try {
    const client = await clientPromise;
    const db = await client.db();
    db.collection('images').replaceOne({}, { data, date: new Date() });
  } catch (err) {
    console.error('error !!!', err);
  }
};
