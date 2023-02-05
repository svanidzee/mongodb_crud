const { MongoClient } = require('mongodb');
require('dotenv').config();

async function main() {
  const uri = process.env.MONGODB_URI;

  const client = new MongoClient(uri);

  try {
    await client.connect();
    // DELETE ONE
    await deleteListingByName(client, 'Cozy Cottage');
    // DELETE MANY
    await deleteListings(client, new Date('2019-02-15'));
  } catch (e) {
    console.log(e);
  } finally {
    await client.close;
  }
}

main().catch(console.error);

async function deleteListingByName(client, nameOfListing) {
  const result = await client
    .db('sample_airbnb')
    .collection('listingsAndReviews')
    .deleteOne({ name: nameOfListing });
  console.log(`${result.deletedCount} document(s) was/were deleted.`);
}

async function deleteListings(client, date) {
  const result = await client
    .db('sample_airbnb')
    .collection('listingsAndReviews')
    .deleteMany({ last_scraped: { $lt: date } });
  console.log(`${result.deletedCount} document(s) was/were deleted.`);
}
