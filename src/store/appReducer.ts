import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getClassById,
  getStudentById,
  getStudentByName,
} from "src/api/filters";
import { TABLE_FIELD_NAMES } from "src/utils/constant";

interface EnrolledClass {
  name: string;
  students: string[];
}

const initialState = {
  isLoggedIn: false,
  isLoading: false,
  classes: [] as EnrolledClass[],
};

export const handleLogin = createAsyncThunk(
  "student/login",
  async (name: string, thunkApi) => {
    const records = await getStudentByName(name);
    const matchingRecord = records.find(
      (record) => record.fields[TABLE_FIELD_NAMES.NAME] === name
    );
    if (matchingRecord) {
      const enrolledClassIds = matchingRecord.fields[
        TABLE_FIELD_NAMES.CLASSES
      ] as string[];
      thunkApi.dispatch(fetchClasses(enrolledClassIds));
    }
  }
);

export const fetchClasses = createAsyncThunk(
  "classes/fetch",
  async (classIds: string[]) => {
    const enrolledClasses = await Promise.all(classIds.map(getClassById));
    const classes = await Promise.all(
      enrolledClasses.map(async (classData) => {
        const name = classData.fields[TABLE_FIELD_NAMES.NAME] as string;
        const studentIds = classData.fields[
          TABLE_FIELD_NAMES.STUDENTS
        ] as string[];
        const students = (await Promise.all(
          studentIds.map((id) => getStudentById(id, TABLE_FIELD_NAMES.NAME))
        )) as string[];
        return {
          name,
          students,
        };
      })
    );
    return classes;
  }
);

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.classes = [];
      state.isLoading = false;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.classes = action.payload;
        state.isLoading = false;
        state.isLoggedIn = true;
      })
      .addCase(fetchClasses.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const actions = appSlice.actions;

export default appSlice.reducer;
