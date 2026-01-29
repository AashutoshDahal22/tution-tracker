import { PrismaClient } from "@/app/generated/prisma/client";
import { NextResponse } from "next/server";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  // unwrap the params Promise
  const params = await context.params;

  if (!params?.id) {
    return NextResponse.json(
      { error: "Student ID is required" },
      { status: 400 },
    );
  }

  try {
    const student = await prisma.student.findUnique({
      where: { id: params.id },
      include: { location: true },
    });

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    return NextResponse.json(student);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch student" },
      { status: 500 },
    );
  }
}
