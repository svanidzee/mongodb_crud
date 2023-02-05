const { MongoClient } = require('mongodb');
require('dotenv').config();

async function main() {
  const uri = process.env.MONGODB_URI;

  const client = new MongoClient(uri);

  // Update the Infinite Views listing to have 6 bedrooms and 8 beds
  await updateListingByName(client, 'Infinite Views', { bedrooms: 6, beds: 8 });

  // upsert
  await upsertListingByName(client, 'Cozy Cottage', {
    name: 'Cozy Cottage',
    bedrooms: 2,
    bathrooms: 1
  });

  try {
    await client.connect();
  } catch (e) {
    console.log(e);
  } finally {
    await client.close;
  }
}

main().catch(console.error);

async function updateListingByName(client, nameOfListing, updatedListing) {
  const result = await client
    .db('sample_airbnb')
    .collection('listingsAndReviews')
    .updateOne(
      {
        name: nameOfListing
      },
      { $set: updatedListing }
    );
  console.log(`${result.matchedCount} document(s) matched the query criteria.`);
  console.log(`${result.modifiedCount} document(s) was/were updated.`);
}

async function upsertListingByName(client, nameOfListing, updatedListing) {
  const result = await client
    .db('sample_airbnb')
    .collection('listingsAndReviews')
    .updateOne(
      {
        name: nameOfListing
      },
      { $set: updatedListing },
      // allows to update a document if it exists or insert a document if it does not
      { upsert: true }
    );
  console.log(`${result.matchedCount} document(s) matched the query criteria.`);

  if (result.upsertedCount > 0) {
    console.log(
      `One document was inserted with the id ${result.upsertedId._id}`
    );
  } else {
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
  }
}
