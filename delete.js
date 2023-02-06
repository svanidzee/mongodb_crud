const { MongoClient } = require('mongodb');
require('dotenv').config();

async function main() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    await deleteListingByName(client);
    await deleteListings(client);
  } catch (e) {
    console.log(e);
  } finally {
    await client.close;
  }
}

main().catch(console.error);

async function deleteListingByName(client) {
  const database = client.db('sample_mflix');
  const movies = database.collection('movies');

  // Query for a movie that has title "Annie Hall"
  const query = { title: 'Annie Hall' };
  const result = await movies.deleteOne(query);

  if (result.deletedCount === 1) {
    console.log('Successfully deleted one document.');
  } else {
    console.log('No documents matched the query. Deleted 0 documents.');
  }
}

async function deleteListings(client) {
  const database = client.db('sample_mflix');
  const movies = database.collection('movies');

  // Query for all movies with a title containing the string "Santa"
  const query = { title: { $regex: 'Santa' } };
  const result = await movies.deleteMany(query);

  console.log('Deleted ' + result.deletedCount + ' documents');
}
