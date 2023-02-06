const { MongoClient } = require('mongodb');
require('dotenv').config();

// estimatedDocumentCount() is faster than countDocuments() because the estimation uses the
// collection's metadata rather than scanning the collection

// countDocuments() takes longer to return, but provides an accurate count
// of the number of documents and supports specifying a filter.
async function run() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    const database = client.db('sample_mflix');
    const movies = database.collection('movies');

    // Estimate the total number of documents in the collection
    // and print out the count.
    const estimate = await movies.estimatedDocumentCount();
    const estimate1 = await movies.countDocuments();
    console.log(
      `Estimated number of documents in the movies collection: ${estimate}`
    );
    console.log(
      `Estimated number of documents in the movies collection: ${estimate1}`
    );

    // Query for movies from Canada.
    const query = { countries: 'Canada' };

    // Find the number of documents that match the specified
    // query, (i.e. with "Canada" as a value in the "countries" field)
    // and print out the count.
    const countCanada = await movies.countDocuments(query);
    console.log(`Number of movies from Canada: ${countCanada}`);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
