const { MongoClient } = require('mongodb');
require('dotenv').config();

async function run() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();

    await createListing(client);
    await createMultipleListinings(client);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

async function createListing(client) {
  const database = client.db('sample_airbnb');
  const rooms = database.collection('listingsAndReviews');

  // create a document to insert
  const doc = {
    name: 'Lovely Loft',
    summary: 'A charming loft in Paris',
    bedrooms: 2,
    bathrooms: 2
  };

  const result = await rooms.insertOne(doc);
  console.log(`A document was inserted with the _id: ${result.insertedId}`);
}

async function createMultipleListinings(client) {
  const database = client.db('sample_airbnb');
  const rooms = database.collection('listingsAndReviews');

  // create a document to insert
  const docs = [
    {
      name: 'Infinite Views',
      summary: 'Modern home with infinite views from the infinity pool',
      property_type: 'House',
      bedrooms: 5,
      bathrooms: 4.5,
      beds: 5
    },
    {
      name: 'Private room in London',
      property_type: 'Apartment',
      bedrooms: 1,
      bathroom: 1
    },
    {
      name: 'Beautiful Beach House',
      summary: 'Enjoy relaxed beach living in this house with a private beach',
      bedrooms: 4,
      bathrooms: 2.5,
      beds: 7,
      last_review: new Date()
    }
  ];

  // this option prevents additional documents from being inserted if one fails
  const options = { ordered: true };

  const result = await rooms.insertMany(docs, options);
  console.log(`${result.insertedCount} documents were inserted`);
}
