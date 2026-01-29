"use client";

import { useStopwatch } from "react-timer-hook";

export default function Clock() {
  const { seconds, minutes, hours, start, pause, reset, isRunning } =
    useStopwatch({ autoStart: false });

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-4xl font-mono bg-gray-900 text-green-300 px-6 py-3 rounded-lg">
        {hours.toString().padStart(2, "0")}:
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </div>

      <div className="flex gap-3">
        {!isRunning ? (
          <button
            onClick={start}
            className="px-4 py-2 rounded bg-green-600 text-white"
          >
            Start
          </button>
        ) : (
          <button
            onClick={pause}
            className="px-4 py-2 rounded bg-red-600 text-white"
          >
            Stop
          </button>
        )}

        <button
          onClick={() => reset(undefined, false)}
          className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-600"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
