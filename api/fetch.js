import client from './db.js';

const database = client.db('test');
const users = database.collection('customers');

async function run() {
  try {
    const data = await users.find({}).toArray();
    return data;
  } finally {
    //Ensures that the client will close when you finish/error
    //await client.close();
  }
}

export default async (req, res) => {
  const data = await run().catch(console.dir);

  res.json({data: data});
  //res.status(200).send(table);
}
