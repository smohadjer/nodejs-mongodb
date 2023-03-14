import database from './db.js';

const users = database.collection('customers');

async function run(req) {
  try {

    await users.insertOne({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      age: req.body.age
    });

  } finally {
    //Ensures that the client will close when you finish/error
    //await client.close();
  }
}

export default async (req, res) => {
    console.log(req.body);
    //return res.send(`Hello ${req.body.username}! (request body)`);

    await run(req);

    return res.send('Done');
}
