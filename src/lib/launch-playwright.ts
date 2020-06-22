const playwright = require("playwright")
const sendDataToImageKit = require("./send-data-to-image-kit")

const launchPlaywright = async (name: string, args: string, url: string) => {
  const browser = await playwright[name].launch({ args })
  const page = await browser.newPage()

  await page.goto(url)

  const buffer = await page.screenshot()
  const image = buffer.toString("base64")

  sendDataToImageKit(image, url, name)

  await browser.close()
}

export default launchPlaywright
