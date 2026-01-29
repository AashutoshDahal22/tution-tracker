"use client";

import { useEffect, useState } from "react";

interface Student {
  id: string;
  name: string;
}

interface StudentSelectProps {
  value: string; // selected student id
  onChange: (value: string) => void;
}

export default function StudentSelect({ value, onChange }: StudentSelectProps) {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const res = await fetch("/api/students");
        const data = await res.json();
        setStudents(data);
      } catch (err) {
        console.error("Failed to fetch students", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStudents();
  }, []);

  if (loading) return <div>Loading students...</div>;

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-600 dark:text-gray-300">
        Select student
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded px-3 py-2 text-base"
      >
        <option value="">Select</option>
        {students.map((student) => (
          <option key={student.id} value={student.id}>
            {student.name} {/* Only show the student name */}
          </option>
        ))}
      </select>
    </div>
  );
}
