"use client";

import { useEffect, useState } from "react";

interface Location {
  id: string;
  locationName: string;
}

interface LocationSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function LocationSelect({
  value,
  onChange,
}: LocationSelectProps) {
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    async function fetchLocations() {
      const res = await fetch("/api/locations");
      const data = await res.json();
      setLocations(data);
    }
    fetchLocations();
  }, []);

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-600 dark:text-gray-300">
        Select location
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded px-3 py-2 text-base"
      >
        <option value="">Select</option>
        {locations.map((loc) => (
          <option key={loc.id} value={loc.id}>
            {loc.locationName}
          </option>
        ))}
      </select>
    </div>
  );
}
