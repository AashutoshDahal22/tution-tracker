"use client";
import { useState } from "react";
import Clock from "./components/Clock";
import LocationSelect from "./components/LocationSelect";
import SubjectSelect from "./components/SubjectSelect";
import StudentSelect from "./components/StudentSelect";

export default function Home() {
  const [location, setLocation] = useState("");
  const [subject, setSubject] = useState("");
  const [studentId, setStudentId] = useState("");

  const isReady = location && subject;

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black px-4">
      {/* Card */}
      <div className="w-full max-w-md bg-white dark:bg-zinc-800 rounded-xl shadow-md p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-center text-gray-800 dark:text-white">
          Tuition Session
        </h1>

        {/* Clock */}
        <Clock />

        {/* Selectors */}
        <div className="space-y-4">
          <LocationSelect value={location} onChange={setLocation} />
          <SubjectSelect value={subject} onChange={setSubject} />
        </div>

        <div className="p-6 flex flex-col gap-4">
          <StudentSelect value={studentId} onChange={setStudentId} />
          {studentId && <p>Selected Student ID: {studentId}</p>}
        </div>
        {!isReady && (
          <p className="text-sm text-center text-gray-500 dark:text-gray-300">
            Please select location and subject to start the session
          </p>
        )}
      </div>
    </div>
  );
}
