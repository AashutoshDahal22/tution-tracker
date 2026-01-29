import { PrismaClient } from "@/app/generated/prisma/client";
import { NextResponse } from "next/server";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const subjects = await prisma.student.findMany({
      where: { id: params.id },
      include: {
        subject: true,
        location: true,
      },
    });
    return NextResponse.json(subjects);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch subjects" },
      { status: 500 },
    );
  }
}
