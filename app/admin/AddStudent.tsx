"use client";

import React, { useState } from "react";
import LocationSelect from "../components/LocationSelect";
import SubjectSelect from "../components/SubjectSelect";

const AddValues = () => {
  const [name, setName] = useState("");
  const [rate, setRate] = useState("");
  const [locationId, setLocationId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !locationId || !subjectId || !rate) {
      setMessage("All fields are required.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          locationId,
          subjectId,
          rate: Number(rate),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Failed to add student");
      } else {
        setMessage("Student added successfully!");
        setName("");
        setRate("");
        setLocationId("");
        setSubjectId("");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-zinc-800 rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
        Add New Student
      </h2>

      {message && (
        <p className="text-sm text-center text-red-600 dark:text-red-400">
          {message}
        </p>
      )}

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded px-3 py-2 text-base"
        />

        <input
          type="number"
          placeholder="Rate (Rs.)"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          className="border rounded px-3 py-2 text-base"
        />

        {/* Use reusable LocationSelect */}
        <LocationSelect value={locationId} onChange={setLocationId} />

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          {loading ? "Adding..." : "Add Student"}
        </button>
      </form>
    </div>
  );
};

export default AddValues;
