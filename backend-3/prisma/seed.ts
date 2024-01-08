import { PrismaClient } from '@prisma/client'
import data from './seed-data.json';

const prisma = new PrismaClient()

async function main() {
    await Promise.all(
        data.map(async item => {
            const response = await prisma.quote.create({
                data: item
            })
        })
    );
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })