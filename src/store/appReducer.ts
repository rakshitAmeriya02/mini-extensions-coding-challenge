import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getClassById,
  getStudentById,
  getStudentByName,
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
  async (name: string, thunkApi) => {
    const records = await getStudentByName(name);
    const matchingRecord = records.find(
      (record) => record.fields[TABLE_FIELD_NAMES.NAME] === name
    );
    return new Promise((resolve, reject) => {
      if (matchingRecord) {
        const enrolledClassIds = matchingRecord.fields[
          TABLE_FIELD_NAMES.CLASSES
        ] as string[];
        thunkApi.dispatch(fetchClasses(enrolledClassIds));
        resolve(enrolledClassIds as any);
      } else {
        const error = new Error(ERROR_MESSAGES.STUDENT_NOT_FOUND);
        reject(error);
      }
    });
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
      .addCase(handleLogin.rejected, (state, action) => {
        state.isLoading = false;
        createNotification(NOTIFICATION_TYPE.ERROR, action.error.message);
      })
      .addCase(fetchClasses.fulfilled, (state, action) => {
        console.log(action);
        state.classes = action.payload;
        state.isLoading = false;
        state.isLoggedIn = true;
        createNotification(
          NOTIFICATION_TYPE.SUCCESS,
          SUCCESS_MESSAGES.LOGIN_SUCCESS
        );
      })
      .addCase(fetchClasses.rejected, (state, action) => {
        state.isLoading = false;
        createNotification(NOTIFICATION_TYPE.ERROR, action.error.message);
      });
  },
});

export const actions = appSlice.actions;

export default appSlice.reducer;
