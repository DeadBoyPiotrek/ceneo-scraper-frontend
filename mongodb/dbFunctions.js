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
    const collections = await db.listCollections().toArray();
    const collectionsNames = [];
    collections.forEach(
      async collection => await collectionsNames.push(collection.name)
    );
    // console.log('collectionsNames', collectionsNames);
    const data = [];
    for await (const name of collectionsNames) {
      const data2 = await db.collection(name).find({}).toArray();
      // console.log('data2', data2);
      data.push(data2);
    }
    // console.log('data', data);
    const dataJson = await JSON.parse(JSON.stringify(data));
    // console.log('dataJson', dataJson);
    return dataJson;
  } catch (e) {
    console.log('error getting data:', e);
    return e?.message;
  }
};
