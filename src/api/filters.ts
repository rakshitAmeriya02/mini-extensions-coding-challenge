import base from "src/api";
import { TABLES, TABLE_FIELD_NAMES } from "src/utils/constant";
import { FieldSet, Record, Records } from "airtable";

export const getStudentByName = async (
  name: string
): Promise<Records<FieldSet>> => {
  const records = await base(TABLES.STUDENTS)
    .select({
      filterByFormula: `SEARCH("${name}",{${TABLE_FIELD_NAMES.NAME}})`,
    })
    .all();
  return records;
};

export const getStudentById = async (
  id: string,
  field?: string
): Promise<Record<FieldSet> | string> => {
  const record = await base(TABLES.STUDENTS).find(id);
  if (field) {
    return record.get(field) as string;
  }
  return record;
};

export const getClassById = async (id: string): Promise<Record<FieldSet>> => {
  const record = await base(TABLES.CLASSES).find(id);
  return record;
};
