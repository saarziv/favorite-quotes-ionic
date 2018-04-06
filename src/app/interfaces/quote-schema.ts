import {QuoteInterface} from "./quote";

export interface QuoteSchemaInterface {
  _id,
  category:string,
  quotes:QuoteInterface[],
  icon:string
}
