import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Hash the password before storing
  const hashedPassword = await bcrypt.hash('admin123', 10);

  // Insert or update the user (upsert)
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {
      password: hashedPassword, // Update password if the user already exists
    },
    create: {
      email: 'admin@example.com', // Email for the new user
      password: hashedPassword,   // Password for the new user
    },
  });

  console.log('Seeded admin user!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
