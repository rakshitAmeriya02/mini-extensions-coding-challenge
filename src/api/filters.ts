import base from "src/api";
import { TABLES, TABLE_FIELD_NAMES } from "src/utils/constant";
import { FieldSet, Records } from "airtable";

export const getStudentsByName = async (
  name: string
): Promise<Records<FieldSet>> => {
  const records = await base(TABLES.STUDENTS)
    .select({
      filterByFormula: `SEARCH("${name}",{${TABLE_FIELD_NAMES.NAME}})`,
    })
    .all();
  return records;
};

export const getStudentsByClassNames = async (
  classes: string[]
): Promise<Records<FieldSet>> => {
  const formula = classes
    .map((className) => {
      return `SEARCH("${className}", ${TABLE_FIELD_NAMES.CLASSES})`;
    })
    .join(", ");
  const records = await base(TABLES.STUDENTS)
    .select({
      filterByFormula: `OR(${formula})`,
    })
    .all();
  return records;
};

export const getClassesByName = async (
  name: string
): Promise<Records<FieldSet>> => {
  const records = await base(TABLES.CLASSES)
    .select({
      filterByFormula: `SEARCH("${name}",{${TABLE_FIELD_NAMES.STUDENTS}})`,
    })
    .all();
  return records;
};
