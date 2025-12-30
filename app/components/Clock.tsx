"use client";
import { useStopwatch } from "react-timer-hook";

export default function Clock() {
  const { seconds, minutes, hours, start, pause, reset, isRunning } =
    useStopwatch({ autoStart: false });

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-5xl font-mono bg-black text-green-400 px-6 py-3 rounded">
        {hours.toString().padStart(2, "0")}:
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </div>

      <div className="flex gap-2">
        {!isRunning ? (
          <button onClick={start} className="btn btn-success">
            Start
          </button>
        ) : (
          <button onClick={pause} className="btn btn-danger">
            Stop
          </button>
        )}
        <button onClick={() => reset(undefined, false)} className="btn">
          Reset
        </button>
      </div>
    </div>
  );
}
