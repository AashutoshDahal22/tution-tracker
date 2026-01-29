"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store";
import { setSubjectId } from "./features/formSlice";
import Clock from "./components/Clock";
import StudentSelect from "./components/StudentSelect";
import SubjectSelect from "./components/SubjectSelect";

export default function Home() {
  const dispatch = useDispatch();
  const student = useSelector((state: RootState) => state.form.student);
  const subjectId = useSelector((state: RootState) => state.form.subjectId);

  const [timerRunning, setTimerRunning] = useState(false);

  const handleSubjectChange = (id: string) => {
    if (!timerRunning) dispatch(setSubjectId(id));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black px-4">
      <div className="w-full max-w-md bg-white dark:bg-zinc-800 rounded-xl shadow-md p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-center text-gray-800 dark:text-white">
          Tuition Session
        </h1>

        {/* Pass a callback to get running state */}
        <Clock onRunningChange={setTimerRunning} />

        <div className="p-6 flex flex-col gap-4">
          {/* Disable student select if timer is running */}
          <div className={timerRunning ? "pointer-events-none opacity-50" : ""}>
            <StudentSelect />
          </div>

          {student && (
            <div className="bg-gray-100 dark:bg-zinc-700 p-4 rounded-lg shadow-md space-y-2">
              <p className="text-lg font-semibold text-gray-800 dark:text-white">
                {student.name}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Location:{" "}
                <span className="font-medium">
                  {student.location.locationName}
                </span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Price:{" "}
                <span className="font-medium text-green-600 dark:text-green-400">
                  Rs. {student.rate}
                </span>
              </p>
            </div>
          )}

          {/* Disable subject select if timer is running */}
          {student && (
            <div
              className={timerRunning ? "pointer-events-none opacity-50" : ""}
            >
              <SubjectSelect value={subjectId} onChange={handleSubjectChange} />
            </div>
          )}
        </div>

        {!student && (
          <p className="text-sm text-center text-gray-500 dark:text-gray-300">
            Please select a student to start the session
          </p>
        )}
      </div>
    </div>
  );
}
