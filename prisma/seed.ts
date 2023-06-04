import { PrismaClient } from '@prisma/client';
import logger from '../src/config/logger';
import { encryptPassword } from '../src/utils/encryption';

const prisma = new PrismaClient();

async function main() {
  logger.info('Seeding database...');
  try {
    const user = await prisma.user.findFirst({
      where: { email: 'admin@fromflow.com' },
    });

    if (user) {
      await prisma.user.delete({
        where: { id: user.id },
      });
    }
    await prisma.user.create({
      data: {
        name: 'Admin',
        email: 'admin@farmflow.com',
        role: 'ADMIN',
        password: await encryptPassword('Admin123'),
      },
    });
    logger.info('Seeding completed!');
  } catch (error) {
    logger.error(error);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    logger.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
