import FormData from "form-data"
import sendDataToFaunaDB from "./send-data-to-fauna-db"
import ImageKit from"imagekit";


const imagekitClient = new ImageKit({
  publicKey : process.env.IMAGEKIT_PUBLIC_KEY || "",
  privateKey : process.env.IMAGEKIT_PRIVATE_KEY || "",
  urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT || ""
});


const sendDataToImageKit = async (image: string, url: string, name: string) => {

  try {

    const data = await imagekitClient.upload({
      file :image, //required
      fileName : `${url}-${name}`,   //required
  })





    sendDataToFaunaDB(data)
  } catch (error) {
    console.log("error", error)
  }
}

export default sendDataToImageKit
