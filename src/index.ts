import launchPlaywright from "./launch-playwright";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const init = async (siteId: string) => {
  console.log("========== Init ==========");

  try {
    const site = await prisma.site.findOne({
      where: {
        id: siteId,
      },
      include: {
        pages: true,
      },
    });

    console.log("========== Site details ==========");
    console.log(site);
    console.log("========== /Site details ==========");

    await site.pages.map(async (page: { id: string; url: string }) => {
      await launchPlaywright("webkit", [], page);
      await launchPlaywright("firefox", [], page);
      await launchPlaywright("chromium", [], page);

      process.exit(0);
    });
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

init("a37d5b4d-befb-410a-b421-bfaa5d176ba4");
