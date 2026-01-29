// app/components/AddSubject.tsx
"use client";

import { useState } from "react";

export default function AddSubject() {
  const [name, setname] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name) {
      setMessage("Subject name is required");
      return;
    }

    try {
      const res = await fetch("/api/subjects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) throw new Error("Failed to add subject");

      setname("");
      setMessage("Subject added successfully!");
    } catch (err: any) {
      setMessage(err.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-zinc-800 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        Add Subject
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Subject Name"
          value={name}
          onChange={(e) => setname(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Add Subject
        </button>
      </form>

      {message && (
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          {message}
        </p>
      )}
    </div>
  );
}
