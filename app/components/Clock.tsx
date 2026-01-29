"use client";

import { useEffect } from "react";
import { useStopwatch } from "react-timer-hook";

interface ClockProps {
  onRunningChange?: (running: boolean) => void;
}

export default function Clock({ onRunningChange }: ClockProps) {
  const { seconds, minutes, hours, start, pause, reset, isRunning } =
    useStopwatch({ autoStart: false });

  // Notify parent whenever running state changes
  useEffect(() => {
    if (onRunningChange) onRunningChange(isRunning);
  }, [isRunning, onRunningChange]);

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
