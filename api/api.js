import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();
// Replace the uri string with your connection string.
const uri =
`mongodb+srv://${process.env.db_username}:${process.env.db_password}@cluster0.8qwlizm.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri);
const database = client.db('test');
const users = database.collection('users');

async function run() {
  try {
    /*
    const database = client.db('sample_mflix');
    const movies = database.collection('movies');

    // Query for a movie that has the title 'Back to the Future'
    const query = { title: 'Back to the Future' };
    const movie = await movies.findOne(query);
    return movie;
    */
    await users.insertOne({
      userId: 3,
      userName: 'Majid'
    });

    const data = await users.find({}).toArray();
    return data;
  } finally {
    //Ensures that the client will close when you finish/error
    //await client.close();
  }
}

export default async (req, res) => {
  const data = await run().catch(console.dir);

  let table = '<table>';
  data.forEach((doc) => {
    table += `<tr><td>${doc.userId}</td><td>${doc.userName}</td></tr>`
  });
  table += '</table>';

  const html = `<!DOCTYPE html>
  <html lang="en">
      <head>
          <meta charset="utf-8" />
          <title>MongoDB demo</title>
          <meta name="description" content="" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
          <main>
            <h1>List</h1>
              ${table}
          </main>
      </body>
  </html>`

  //  res.json({message: data});
  res.status(200).send(html);
}
