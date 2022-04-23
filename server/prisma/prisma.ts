import { PrismaClient } from "@prisma/client";

export const prisma: PrismaClient =
  global.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
