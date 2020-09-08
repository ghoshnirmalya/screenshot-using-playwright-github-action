var _require = require("@prisma/client"),
    PrismaClient = _require.PrismaClient;

var prisma = new PrismaClient();

var sendDataToDB = function sendDataToDB(image, page, browserType) {
  try {
    console.log("========== Sending data to DB for " + browserType + " ==========");
    return Promise.resolve(prisma.screenshot.create({
      data: {
        image: image,
        page: {
          connect: {
            id: page.id
          }
        }
      }
    })).then(function (screenshot) {
      console.log("========== /Sending data to DB for " + browserType + " ==========");
      return {
        screenshot: screenshot
      };
    });
  } catch (e) {
    return Promise.reject(e);
  }
};

var playwright = require("playwright");

var launchPlaywright = function launchPlaywright(browserType, args, page) {
  try {
    console.log("========== Running Playwright for " + browserType + " ==========");
    return Promise.resolve(playwright[browserType].launch({
      args: args
    })).then(function (browser) {
      return Promise.resolve(browser.newPage()).then(function (browserPage) {
        return Promise.resolve(browserPage["goto"](page.url)).then(function () {
          return Promise.resolve(browserPage.screenshot()).then(function (buffer) {
            var image = buffer.toString("base64");
            return Promise.resolve(sendDataToDB(image, page, browserType)).then(function () {
              return Promise.resolve(browser.close()).then(function () {
                console.log("========== /Running Playwright for " + browserType + " ==========");
              });
            });
          });
        });
      });
    });
  } catch (e) {
    return Promise.reject(e);
  }
};

function _catch(body, recover) {
  try {
    var result = body();
  } catch (e) {
    return recover(e);
  }

  if (result && result.then) {
    return result.then(void 0, recover);
  }

  return result;
}

var _require$1 = require("@prisma/client"),
    PrismaClient$1 = _require$1.PrismaClient;

var prisma$1 = new PrismaClient$1();

var init = function init(siteId) {
  try {
    console.log("========== Init ==========");

    var _temp2 = _catch(function () {
      return Promise.resolve(prisma$1.site.findOne({
        where: {
          id: siteId
        },
        include: {
          pages: true
        }
      })).then(function (site) {
        console.log("========== Site details ==========");
        console.log(site);
        console.log("========== /Site details ==========");
        return Promise.resolve(site.pages.map(function (page) {
          try {
            return Promise.resolve(launchPlaywright("webkit", [], page)).then(function () {
              return Promise.resolve(launchPlaywright("firefox", [], page)).then(function () {
                return Promise.resolve(launchPlaywright("chromium", [], page)).then(function () {
                  process.exit(0);
                });
              });
            });
          } catch (e) {
            return Promise.reject(e);
          }
        })).then(function () {});
      });
    }, function (error) {
      console.error(error);
      process.exit(1);
    });

    return Promise.resolve(_temp2 && _temp2.then ? _temp2.then(function () {}) : void 0);
  } catch (e) {
    return Promise.reject(e);
  }
};

init("a37d5b4d-befb-410a-b421-bfaa5d176ba4");
//# sourceMappingURL=index.esm.js.map
