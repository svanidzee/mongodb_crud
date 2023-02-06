const { MongoClient } = require('mongodb');
require('dotenv').config();

async function main() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();

    // await updateListingByName(client);
    // await updateManyListingByName(client);
    await replaceListing(client);
  } catch (e) {
    console.log(e);
  } finally {
    await client.close;
  }
}

main().catch(console.error);

async function updateListingByName(client) {
  const database = client.db('sample_mflix');
  const movies = database.collection('movies');

  // create a filter for a movie to update
  const filter = { title: 'Random Harvest' };

  // this option instructs the method to create a document if no documents match the filter
  const options = { upsert: true };

  // create a document that sets the plot of the movie
  const updateDoc = {
    $set: {
      plot: `A harvest of random numbers, such as: ${Math.random()}`
    }
  };

  const result = await movies.updateOne(filter, updateDoc, options);
  console.log(
    `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
  );
}

async function updateManyListingByName(client) {
  const database = client.db('sample_mflix');
  const movies = database.collection('movies');

  // create a filter to update all movies with a 'G' rating
  const filter = { rated: 'G' };

  // this option instructs the method to create a document if no documents match the filter
  const options = { upsert: true };

  // increment every document matching the filter with 2 more comments
  const updateDoc = {
    $set: {
      random_review: `After viewing I am ${
        100 * Math.random()
      }% more satisfied with life.`
    }
  };
  const result = await movies.updateMany(filter, updateDoc);
  console.log(`Updated ${result.modifiedCount} documents`);
}

async function replaceListing(client) {
  const database = client.db('sample_mflix');
  const movies = database.collection('movies');

  // create a query for a movie to update
  const query = { title: { $regex: 'The Cat from' } };

  // create a new document that will be used to replace the existing document
  const replacement = {
    title: `The Cat from Sector ${Math.floor(Math.random() * 1000) + 1}`
  };
  const result = await movies.replaceOne(query, replacement);
  console.log(`Modified ${result.modifiedCount} document(s)`);
}
