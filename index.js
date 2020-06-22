require("dotenv").config();

const launchPlaywright = require("./lib/launch-playwright");

(async () => {
  await launchPlaywright(
    "chromium",
    ["--no-sandbox"],
    "http://whatsmyuseragent.org/"
  );
  await launchPlaywright("webkit", [], "http://whatsmyuseragent.org/");
  await launchPlaywright("firefox", [], "http://whatsmyuseragent.org/");
})();
