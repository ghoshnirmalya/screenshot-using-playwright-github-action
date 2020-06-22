import faunadb from "faunadb"

const sendDataToFaunaDB = (data: any, collectionName = "screenshots") => {
  const q = faunadb.query

  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SECRET_KEY || "",
  })

  client.query(q.Create(q.Collection(collectionName), { data }))
}

export default sendDataToFaunaDB
