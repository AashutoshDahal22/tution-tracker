// app/admin/page.tsx
import AddLocation from "./AddLocation";
import AddSubject from "./AddSubject";
import AddValues from "./AddStudent";

export default function AdminPage() {
  return (
    <>
      <AddValues />
      <AddLocation />
      <AddSubject />
    </>
  );
}
