import client from './db.js';

const database = client.db('test');
const users = database.collection('customers');

async function run(req) {
  try {
    await users.insertOne({
      firstname: req.body.firstname.trim(),
      lastname: req.body.lastname.trim(),
      age: req.body.age.trim()
    });
  } finally {
    //Ensures that the client will close when you finish/error
    //await client.close();
  }
}

export default async (req, res) => {
    await run(req);
    return res.send('done');
}
