export const BASE_URL = "https://api.airtable.com";

export const envVariables = {
  AIRTABLE_BASE: process.env.REACT_APP_AIRTABLE_BASE || "",
  API_KEY: process.env.REACT_APP_API_KEY || "",
};

export enum TABLES {
  CLASSES = "Classes",
  STUDENTS = "Students",
}

export enum TABLE_FIELD_NAMES {
  CLASSES = "Classes",
  NAME = "Name",
  STUDENTS = "Students",
}

export enum NOTIFICATION_TYPE {
  ERROR = "error",
  SUCCESS = "success",
}

export enum SUCCESS_MESSAGES {
  LOGIN_SUCCESS = "Logged in successfully!",
}

export enum ERROR_MESSAGES {
  GENERIC_ERROR = "Something went wrong!",
  STUDENT_NOT_FOUND = "No records found",
}

