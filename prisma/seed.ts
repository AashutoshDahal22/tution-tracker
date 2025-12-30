import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("🌱 Seeding database...");

  // ---------- LOCATIONS ----------
  const baneshowr = await prisma.location.create({
    data: { name: "baneshowr" },
  });

  // ---------- STUDENTS ----------
  const student1 = await prisma.student.create({
    data: {
      name: "Aashutosh Dahal",
      subject: "Nepali",
    },
  });

  // ---------- SESSIONS ----------
  await prisma.tuitionSession.createMany({
    data: [
      {
        studentId: student1.id,
        locationId: baneshowr.id,
        date: new Date("2025-01-03"),
        startTime: new Date("2025-01-03T16:00:00"),
        endTime: new Date("2025-01-03T17:30:00"),
        durationMinutes: 90,
      },
    ],
  });

  console.log("✅ Seeding completed.");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
