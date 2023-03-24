import uri from './db.js';
import { MongoClient } from 'mongodb';

const client = new MongoClient(uri);

async function run(req) {
  try {
    console.log('openning db...');
    await client.connect();
    const database = client.db('test');
    const users = database.collection('users');
    let data;
    if (req.body.id) {
      data = await users.findOne({id: Number(req.body.id)});
      console.log(data);
    } else {
      data = await users.find({}).sort({ id: 1 }).toArray();
    }
    return data;
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
  const data = await run(req).catch(console.dir);

  res.json({data: data});
  //res.status(200).send(table);
}
