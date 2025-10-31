import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.status.createMany({
    data: [{ name: 'ACTIVE' }, { name: 'PENDING' }, { name: 'INACTIVE' }],
    skipDuplicates: true,
  });

  await prisma.role.createMany({
    data: [{ name: 'ADMIN' }, { name: 'CLIENT' }],
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
