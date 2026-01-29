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
    const subjects = await prisma.subject.findMany({
      orderBy: { subjectName: "asc" },
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

export async function POST(req: Request) {
  try {
    const { name } = await req.json();

    if (!name) {
      return NextResponse.json(
        { error: "Please enter subject to add" },
        { status: 400 },
      );
    }

    const subjects = await prisma.subject.upsert({
      where: { subjectName: name },
      update: {},
      create: { subjectName: name },
    });
    return NextResponse.json(subjects);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
