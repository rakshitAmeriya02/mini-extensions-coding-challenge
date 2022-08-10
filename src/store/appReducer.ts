import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getClassesByName,
  getStudentsByClassNames,
  getStudentsByName,
} from "src/api/filters";
import {
  ERROR_MESSAGES,
  NOTIFICATION_TYPE,
  SUCCESS_MESSAGES,
  TABLE_FIELD_NAMES,
} from "src/utils/constant";
import { createNotification } from "src/utils/helpers";

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
  async (name: string): Promise<EnrolledClass[]> => {
    // fetches students with matching name
    const records = await getStudentsByName(name);
    // filters the first student with exact name
    const matchingRecord = records.find(
      (record) => record.fields[TABLE_FIELD_NAMES.NAME] === name
    );
    return new Promise(async (resolve, reject) => {
      if (matchingRecord) {
        // fetches classes searched student has enrolled
        const classesRecords = await getClassesByName(name);
        const enrolledClasses = classesRecords.map((item) => ({
          name: item.fields[TABLE_FIELD_NAMES.NAME],
          students: item.fields[TABLE_FIELD_NAMES.STUDENTS],
        })) as EnrolledClass[];
        const classNames = enrolledClasses.map((item) => item.name);
        const studentsObj: {
          [key: string]: string;
        } = {};
        // fetches all the students who have enrolled in the same class / classes
        const studentsRecords = await getStudentsByClassNames(classNames);
        studentsRecords.forEach((item) => {
          const id = item.id as string;
          const name = item.fields[TABLE_FIELD_NAMES.NAME] as string;
          studentsObj[id] = name;
        });
        const data = [] as EnrolledClass[];
        // formats or filters data precisely according to searched student
        enrolledClasses.forEach((item) => {
          const students = item.students.map((id) => studentsObj[id]);
          if (students.includes(name)) {
            data.push({
              name: item.name,
              students,
            });
          }
        });
        resolve(data);
      } else {
        const error = new Error(ERROR_MESSAGES.STUDENT_NOT_FOUND);
        reject(error);
      }
    });
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
      .addCase(handleLogin.rejected, (state, action) => {
        state.isLoading = false;
        createNotification(NOTIFICATION_TYPE.ERROR, action.error.message);
      })
      .addCase(handleLogin.fulfilled, (state, action) => {
        state.classes = action.payload;
        state.isLoading = false;
        state.isLoggedIn = true;
        createNotification(
          NOTIFICATION_TYPE.SUCCESS,
          SUCCESS_MESSAGES.LOGIN_SUCCESS
        );
      });
  },
});

export const actions = appSlice.actions;

export default appSlice.reducer;
