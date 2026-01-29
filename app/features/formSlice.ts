import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Student {
  id: string;
  name: string;
  location: { id: string; locationName: string };
  rate: number;
}

interface FormState {
  student?: Student;
  subjectId: string;
}

const initialState: FormState = {
  student: undefined,
  subjectId: "",
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setStudent: (state, action: PayloadAction<Student | undefined>) => {
      state.student = action.payload;
    },
    setSubjectId: (state, action: PayloadAction<string>) => {
      state.subjectId = action.payload;
    },
  },
});

export const { setStudent, setSubjectId } = formSlice.actions;
export default formSlice.reducer;
