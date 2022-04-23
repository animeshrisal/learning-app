import { PrismaClient, Prisma } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma: PrismaClient = new PrismaClient();

const admin: Prisma.UserCreateInput = {
  name: "admin",
  password: hashPassword("admin123"),
  email: "animeshrisal99@gmail.com",
  role: 0,
};

async function main() {
  await prisma.user.create({
    data: admin,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

function hashPassword(string) {
  return bcrypt.hashSync(string, 8);
}
