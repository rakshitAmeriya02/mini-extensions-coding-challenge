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

// export enum CLASSES_FIELDS {
//   NAME = "fldkSRh4WHOHOyYLf",
//   STUDENTS = "fld1TImr7nucL2tGJ",
// }

// export enum STUDENTS_FIELDS {
//   NAME = "fld5ckhQnYC5iGlRR",
//   STUDENTS = "fldc8Tyl8YheKW6Xp",
// }
