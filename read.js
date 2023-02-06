const { MongoClient } = require('mongodb');
require('dotenv').config();

async function run() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();

    await findOneListingByName(client);
    await findOneListingByInOperator(client);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

async function findOneListingByInOperator(client) {
  const database = client.db('sample_airbnb');
  const rooms = database.collection('listingsAndReviews');

  const query = {
    name: {
      $in: ['Ribeira Charming Duplex', "THE Place to See Sydney's FIREWORKS"]
    }
  };

  // Include only the `name` field in each returned document
  const options = {
    projection: { _id: 0, name: 1 }
  };

  const cursor = rooms.find(query, options);

  if ((await cursor.count()) === 0) {
    console.log('No documents found!');
  }

  await cursor.forEach(console.dir);
}

async function findOneListingByName(client) {
  const database = client.db('sample_airbnb');
  const rooms = database.collection('listingsAndReviews');

  const query = { name: 'Ribeira Charming Duplex' };

  // Include only the `name` field in each returned document
  const options = {
    projection: { _id: 0, name: 1 }
  };

  const cursor = rooms.find(query, options);

  if ((await cursor.count()) === 0) {
    console.log('No documents found!');
  }

  await cursor.forEach(console.dir);
}
