import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setStudent } from "../features/formSlice";

interface Student {
  id: string;
  name: string;
  rate: number;
  location: { id: string; locationName: string };
}

export default function StudentSelect() {
  const dispatch = useDispatch();
  const selectedStudent = useSelector((state: RootState) => state.form.student);

  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStudents() {
      const res = await fetch("/api/students");
      const data = await res.json();
      setStudents(data);
      setLoading(false);
    }
    fetchStudents();
  }, []);

  const handleChange = (id: string) => {
    const student = students.find((s) => s.id === id);
    dispatch(setStudent(student)); // store the full student
  };

  if (loading) return <div>Loading students...</div>;

  return (
    <div className="flex flex-col gap-1">
      <label>Select student</label>
      <select
        value={selectedStudent?.id || ""}
        onChange={(e) => handleChange(e.target.value)}
        className="border rounded px-3 py-2 text-base"
      >
        <option value="">Select</option>
        {students.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>
    </div>
  );
}
