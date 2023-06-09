import uri from './db.js';
import { MongoClient } from 'mongodb';

const client = new MongoClient(uri);

async function run(req) {
  try {
    await client.connect();
    const database = client.db('test');
    const users = database.collection('users');
    const id = Number(req.body.id);
    console.log(req.body);
    //const result = await users.deleteOne({ id: id });

    var newvalues = { $set: {status: "inactive" } };
    const result = await users.updateOne({ id: id }, newvalues);

    /*
    if (result.deletedCount === 1) {
      console.log("Successfully deleted one document.");
    } else {
      console.log("No documents matched the query. Deleted 0 documents.");
    }
    */
  } catch (e) {
    console.error(e);
  } finally {
    //Ensures that the client will close when you finish/error
    await client.close();
  }
}

export default async (req, res) => {
  await run(req);
  return res.send('done');
}
