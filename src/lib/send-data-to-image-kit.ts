import FormData from "form-data"
import sendDataToFaunaDB from "./send-data-to-fauna-db"

const fetch = require("node-fetch")

if (!globalThis.fetch) {
  globalThis.fetch = fetch
}

const sendDataToImageKit = async (image: string, url: string, name: string) => {
  const formdata = new FormData()

  formdata.append("file", image)
  formdata.append("fileName", `${url}-${name}`)

  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Basic ${process.env.IMAGEKIT_PRIVATE_KEY}`,
    },
    body: formdata,
    redirect: "follow",
  }

  try {
    const response = await fetch(
      "https://upload.imagekit.io/api/v1/files/upload",
      requestOptions
    )
    const data = await response.json()

    sendDataToFaunaDB(data)
  } catch (error) {
    console.log("error", error)
  }
}

export default sendDataToImageKit
