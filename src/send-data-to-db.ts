const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const sendDataToDB = async (
  image: any,
  page: { id: string; url: string },
  browserType: string
) => {
  const screenshot = await prisma.screenshot.create({
    data: {
      image,
      page: {
        connect: { id: page.id },
      },
    },
  });

  return {
    screenshot,
  };
};

export default sendDataToDB;
