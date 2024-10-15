import { GenericEntity } from "../generic";

export interface CurrencyFactor extends GenericEntity { 
  sort: number;         // integer
  user_created: string; // char(36)
  date_created: Date;   // datetime
  user_updated: string; // char(36)
  date_updated: Date;   // datetime
  factor: number;       // float
  currency: string;     // char(36)
  date: Date;           // datetime
}
