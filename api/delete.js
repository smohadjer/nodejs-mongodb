import client from './db.js';

const database = client.db('test');
const users = database.collection('customers');

async function run(req) {
  try {
    const result = await users.deleteOne({ firstname: req.body.firstname });
    if (result.deletedCount === 1) {
      console.log("Successfully deleted one document.");
    } else {
      console.log("No documents matched the query. Deleted 0 documents.");
    }
  } finally {
    //Ensures that the client will close when you finish/error
    //await client.close();
  }
}

export default async (req, res) => {
  await run(req);
  return res.send('done');

}
