import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

// create the adapter using your DATABASE_URL
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

// create the Prisma client only once (singleton)
const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter, // adapter is required in Prisma 7+
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
