import { PrismaClient, Prisma } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import { Role } from "@prisma/client";

const prisma: PrismaClient = new PrismaClient();

const admin: Prisma.UserCreateInput = {
  username: "admin",
  password: hashPassword("admin123"),
  email: "animeshrisal2@gmail.com",
  role: Role.USER,
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
