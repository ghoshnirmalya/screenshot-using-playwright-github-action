const faunadb = require("faunadb");

const sendDataToFaunaDB = (data, collectionName = "screenshots") => {
  q = faunadb.query;

  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SECRET_KEY,
  });

  client.query(q.Create(q.Collection(collectionName), { data }));
};

module.exports = sendDataToFaunaDB;
