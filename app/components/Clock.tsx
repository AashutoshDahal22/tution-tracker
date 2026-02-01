"use client";
import { useStopwatch } from "react-timer-hook";

interface ClockProps {
  onRunningChange?: (running: boolean) => void;
  onStop?: (stopTime: Date) => void; // called when session stops
}

export default function Clock({ onRunningChange, onStop }: ClockProps) {
  const { seconds, minutes, hours, start, pause, reset, isRunning } =
    useStopwatch({ autoStart: false });

  const handleStart = () => {
    start();
    onRunningChange?.(true);
  };

  const handlePause = () => {
    pause(); // just pauses the timer
    onRunningChange?.(false);
  };

  const handleStop = () => {
    pause(); // stop timer completely
    onRunningChange?.(false);
    onStop?.(new Date()); // trigger stop callback
    reset(undefined, false); // optionally reset timer after stopping
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-4xl font-mono bg-gray-900 text-green-300 px-6 py-3 rounded-lg">
        {hours.toString().padStart(2, "0")}:
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleStart}
          disabled={isRunning}
          className="px-4 py-2 rounded bg-green-600 text-white disabled:opacity-50"
        >
          Start
        </button>

        <button
          onClick={handlePause}
          disabled={!isRunning}
          className="px-4 py-2 rounded bg-yellow-500 text-white disabled:opacity-50"
        >
          Pause
        </button>

        <button
          onClick={handleStop}
          className="px-4 py-2 rounded bg-red-600 text-white"
        >
          Stop
        </button>
      </div>
    </div>
  );
}
