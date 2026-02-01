import { PrismaClient } from "@/app/generated/prisma/client";
import { NextResponse } from "next/server";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

export async function GET(req: Request) {
  try {
    // Parse query params (optional filters)
    const url = new URL(req.url);
    const studentId = url.searchParams.get("studentId");
    const subjectId = url.searchParams.get("subjectId");

    const sessions = await prisma.tuitionSession.findMany({
      where: {
        studentId: studentId ?? undefined,
        subjectId: subjectId ?? undefined,
      },
      include: {
        student: true, // include student info
        subject: true, // include subject info
      },
      orderBy: {
        startTime: "desc",
      },
    });

    return NextResponse.json(sessions);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch tuition sessions" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const { studentId, subjectId, startTime, endTime } = await req.json();

    if (!studentId || !subjectId || !startTime || !endTime) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Parse start/end times
    const start = new Date(startTime);
    const end = new Date(endTime);
    if (start >= end) {
      return NextResponse.json(
        { error: "End time must be after start time" },
        { status: 400 },
      );
    }

    // Compute duration in minutes
    const durationMinutes = (end.getTime() - start.getTime()) / 1000 / 60;

    // Fetch student's rate per hour
    const student = await prisma.student.findUnique({
      where: { id: studentId },
    });
    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    // Calculate totalMoney (duration in hours * rate)
    const totalMoney = parseFloat(
      ((durationMinutes / 60) * student.rate).toFixed(2),
    );

    // Create tuition session
    const session = await prisma.tuitionSession.create({
      data: {
        studentId,
        subjectId,
        startTime: start,
        endTime: end,
        durationMinutes,
        totalMoney,
        date: start, // session date same as startTime
      },
    });

    return NextResponse.json(session);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
