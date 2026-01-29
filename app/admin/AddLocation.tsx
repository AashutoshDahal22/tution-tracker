"use client";

import { useState } from "react";

export default function AddLocation() {
  const [name, setname] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setMessage("Location name is required");
      return;
    }

    try {
      const res = await fetch("/api/locations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Failed to add location");
        return;
      }

      setname("");
      setMessage("Location added successfully!");
    } catch (err: any) {
      console.error(err);
      setMessage(err.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-zinc-800 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        Add Location
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Location Name"
          value={name}
          onChange={(e) => setname(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Add Location
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
