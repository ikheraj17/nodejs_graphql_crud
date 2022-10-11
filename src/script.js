const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
    const newLink = await prisma.link.create({
        data: {
            description: "This is the first entry in our Prisma DB",
            url: "www.howtographql.com",
        }
    })
    const allLinks = await prisma.link.findMany()
    console.log(allLinks);
}

main()
    .catch(e => {
        throw e
    })
    .finally(async() => {
        await prisma.$disconnect()
    })