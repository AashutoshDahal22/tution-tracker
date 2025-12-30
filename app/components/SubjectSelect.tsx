"use client";

interface SubjectSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SubjectSelect({ value, onChange }: SubjectSelectProps) {
  return (
    <div className="flex flex-col gap-1">
      <label>Select the subject</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded px-3 py-2"
      >
        <option className="dark:text-black" value="">
          Select
        </option>
        <option className="dark:text-black" value="social">
          Social Studies
        </option>
        <option className="dark:text-black" value="nepali">
          Nepali
        </option>
      </select>
    </div>
  );
}
