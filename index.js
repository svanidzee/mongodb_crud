const { MongoClient } = require('mongodb');
require('dotenv').config();

async function main() {
  //   const uri =
  //     'mongodb+srv://admin:palasio223@cluster0.qr9etfn.mongodb.net/?retryWrites=true&w=majority';

  const uri = process.env.MONGODB_URI;

  const client = new MongoClient(uri);

  try {
    await client.connect();
    await listDatabases(client);
  } catch (e) {
    console.log(e);
  } finally {
    await client.close;
  }
}

main().catch(console.error);

async function listDatabases(client) {
  const databasesList = await client.db().admin().listDatabases();

  console.log('Databases:');
  databasesList.databases.forEach((db) => {
    console.log(`- ${db.name}`);
  });
}
