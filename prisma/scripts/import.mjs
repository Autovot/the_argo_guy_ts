import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function importData() {
  const data = JSON.parse(fs.readFileSync('exported-data.json', 'utf-8'));
  for (const button of data) {
    await prisma.buttons.create({ data: button });
  }
}

importData()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
