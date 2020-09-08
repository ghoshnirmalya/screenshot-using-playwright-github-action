import sendDataToDB from "./send-data-to-db";

const playwright = require("playwright");

const launchPlaywright = async (
  browserType: string,
  args: string[],
  page: { id: string; url: string }
) => {
  const browser = await playwright[browserType].launch({ args });
  const browserPage = await browser.newPage();

  await browserPage.goto(page.url);

  const buffer = await browserPage.screenshot();
  const image = buffer.toString("base64");

  await sendDataToDB(image, page, browserType);

  await browser.close();
};

export default launchPlaywright;
