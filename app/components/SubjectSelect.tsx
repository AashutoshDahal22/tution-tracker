"use client";

import { useEffect, useState } from "react";

interface Subject {
  id: string;
  subjectName: string;
}

interface SubjectSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SubjectSelect({ value, onChange }: SubjectSelectProps) {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    async function fetchSubjects() {
      const res = await fetch("/api/subjects");
      const data = await res.json();
      setSubjects(data);
    }
    fetchSubjects();
  }, []);

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-600 dark:text-gray-300">
        Select subject
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded px-3 py-2 text-base"
      >
        <option value="">Select</option>
        {subjects.map((sub) => (
          <option key={sub.id} value={sub.id}>
            {sub.subjectName}
          </option>
        ))}
      </select>
    </div>
  );
}
