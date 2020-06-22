require("dotenv").config();

const playwright = require("playwright");
const FormData = require("form-data");
const fetch = require("node-fetch");
const faunadb = require("faunadb");

if (!globalThis.fetch) {
  globalThis.fetch = fetch;
}

async function run(name, args, url) {
  q = faunadb.query;
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SECRET_KEY,
  });

  const browser = await playwright[name].launch({ args });
  const page = await browser.newPage();

  await page.goto(url);

  const buffer = await page.screenshot();
  const image = buffer.toString("base64");

  const formdata = new FormData();
  formdata.append("file", image);
  formdata.append("fileName", `${url}-${name}`);

  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Basic ${process.env.IMAGEKIT_PRIVATE_KEY}`,
    },
    body: formdata,
    redirect: "follow",
  };

  fetch("https://upload.imagekit.io/api/v1/files/upload", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      client.query(q.Create(q.Collection("screenshots"), { data: result }));
    })
    .catch((error) => console.log("error", error));

  await browser.close();
}

(async () => {
  await run("chromium", ["--no-sandbox"], "http://whatsmyuseragent.org/");
  await run("webkit", [], "http://whatsmyuseragent.org/");
  await run("firefox", [], "http://whatsmyuseragent.org/");
})();
