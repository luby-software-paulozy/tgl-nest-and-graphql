import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const cartDefault: Prisma.CartCreateInput[] = [{ min_cart_value: 20 }];

async function main() {
  cartDefault.forEach(async (value) => {
    const minValue = await prisma.cart.create({ data: value });
    console.log(`MinCartVlue created ${minValue.min_cart_value}`);
  });
}

main()
  .catch(console.log)
  .finally(async () => await prisma.$disconnect());
