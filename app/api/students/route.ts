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

export async function GET() {
  try {
    const students = await prisma.student.findMany({
      include: { subject: false, location: false },
      orderBy: { name: "asc" },
    });

    return NextResponse.json(students);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch students" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const { name, subjectId, locationId } = await req.json();

    if (!name || !subjectId || !locationId) {
      return NextResponse.json(
        { error: "Name, subjectId and locationId are required" },
        { status: 400 },
      );
    }

    const student = await prisma.student.create({
      data: { name, subjectId, locationId },
    });

    return NextResponse.json(student);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
