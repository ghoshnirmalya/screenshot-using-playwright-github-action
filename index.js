const playwright = require("playwright");
const FormData = require("form-data");
const fetch = require("node-fetch");

if (!globalThis.fetch) {
  globalThis.fetch = fetch;
}

async function run(name, args, url) {
  const browser = await playwright[name].launch({ args });
  const page = await browser.newPage();

  await page.goto(url);

  const buffer = await page.screenshot();
  const image = buffer.toString("base64");

  const formdata = new FormData();
  formdata.append("image", image);
  formdata.append("type", "base64");
  formdata.append("title", `${url}-${name}`);
  formdata.append("description", `Screenshot of ${url} using ${name} browser`);

  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Client-ID 244c7118193f2e4 ${process.env.IMGUR_CLIENT_ID}`,
    },
    body: formdata,
    redirect: "follow",
  };

  fetch("https://api.imgur.com/3/image", requestOptions)
    .then((response) => response.json())
    .then((result) => console.log(result.data.link))
    .catch((error) => console.log("error", error));

  await browser.close();
}

(async () => {
  await run("chromium", ["--no-sandbox"], "http://whatsmyuseragent.org/");
  await run("webkit", [], "http://whatsmyuseragent.org/");
  await run("firefox", [], "http://whatsmyuseragent.org/");
})();
