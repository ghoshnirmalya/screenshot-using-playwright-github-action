import faunadb from "faunadb"

const faunadbClient = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET_KEY || "",
})

const sendDataToFaunaDB = async(data: any, collectionName = "screenshots") => {
  const q = faunadb.query




  try {
    await faunadbClient.query(q.Create(q.Collection(collectionName), { data }))
  } catch (error) {
    console.log("error", error)
  }
}

export default sendDataToFaunaDB
