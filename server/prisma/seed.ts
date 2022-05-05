import { PrismaClient, Prisma } from "@prisma/client";
import { Role } from "@prisma/client";
import { hashPassword } from "../helpers/auth";

const prisma: PrismaClient = new PrismaClient();

const admin: Prisma.UserCreateInput = {
  username: "admin",
  password: hashPassword("admin123"),
  email: "animeshrisal99@gmail.com",
  role: Role.ADMIN,
};

const teacher: Prisma.UserCreateInput = {
  username: "teacher",
  password: hashPassword("teacher123"),
  email: "animesh.function@gmail.com",
  role: Role.TEACHER,
};

const student: Prisma.UserCreateInput = {
  username: "student",
  password: hashPassword("student123"),
  email: "wintergensokyo@gmail.com",
  role: Role.USER,
};



async function main() {
  await prisma.user.createMany({
    data: [admin, teacher, student],
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


