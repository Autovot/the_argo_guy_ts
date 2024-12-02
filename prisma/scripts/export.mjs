import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function exportData() {
  const buttons = await prisma.buttons.findMany();
  fs.writeFileSync('exported-data.json', JSON.stringify(buttons, null, 2));
}

exportData()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
