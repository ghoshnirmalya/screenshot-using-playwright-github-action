const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const sendDataToDB = async (
  image: any,
  page: { id: string; url: string },
  browserType: string
) => {
  console.log(`========== Sending data to DB for ${browserType} ==========`);

  const screenshot = await prisma.screenshot.create({
    data: {
      image,
      page: {
        connect: { id: page.id },
      },
    },
  });

  console.log(`========== /Sending data to DB for ${browserType} ==========`);

  return {
    screenshot,
  };
};

export default sendDataToDB;
