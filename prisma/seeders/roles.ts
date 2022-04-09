import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const rolesData: Prisma.RolesCreateInput[] = [
  { name: 'admin' },
  { name: 'default_user' },
];

async function main() {
  rolesData.forEach(async (role) => {
    const newRole = await prisma.roles.create({ data: role });
    console.log(`Role created ${newRole.name}`);
  });
}

main()
  .catch(console.log)
  .finally(async () => await prisma.$disconnect());
