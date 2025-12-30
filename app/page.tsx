"use client";
import Image from "next/image";
import { useState } from "react";
import Clock from "./components/Clock";
import LocationSelect from "./components/LocationSelect";
import SubjectSelect from "./components/SubjectSelect";

export default function Home() {
  const [location, setLocation] = useState("");
  const [subject, setSubject] = useState("");

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <LocationSelect value={location} onChange={setLocation} />
      <SubjectSelect value={subject} onChange={setSubject} />
      <Clock />
    </div>
  );
}
