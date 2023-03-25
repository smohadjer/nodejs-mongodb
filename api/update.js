import uri from './db.js';
import { MongoClient } from 'mongodb';

const client = new MongoClient(uri);

async function run(req) {
  try {
    console.log('openning db...');
    await client.connect();
    const database = client.db('test');
    const users = database.collection('users');

    await users.updateMany({ status: "inactive"}, { $unset: { status: "inactive"}});
  } catch (e) {
    console.error(e);
  } finally {
    //Ensures that the client will close when you finish/error
    console.log('closing db...');
    await client.close();
  }
}

export default async (req, res) => {
  console.log(req.body.id);
  await run(req).catch(console.dir);

  return res.send('reset done');
  //res.status(200).send(table);
}
