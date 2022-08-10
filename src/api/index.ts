import Airtable from "airtable";
import { BASE_URL, envVariables } from "src/utils/constant";

Airtable.configure({
  endpointUrl: BASE_URL,
  apiKey: envVariables.API_KEY,
});

export const base = Airtable.base(envVariables.AIRTABLE_BASE);

export default base;
