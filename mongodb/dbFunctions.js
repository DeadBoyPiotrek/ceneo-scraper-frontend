import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI;
const options = {};
const client = new MongoClient(uri, options);
const clientPromise = client.connect();

export const getCollectionsNames = async () => {
  const client = await clientPromise;
  const db = client.db();
  const collections = await db.listCollections().toArray();
  const collectionsNames = collections.map(collection => collection.name);
  // console.log('collectionsNames', collectionsNames);
  return collectionsNames;
};

export const getData = async () => {
  const client = await clientPromise;
  const db = client.db();
  try {
    const collectionsNames = await getCollectionsNames();
    const data = [];
    for await (const name of collectionsNames) {
      const data2 = await db.collection(name).find({}).toArray();
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
