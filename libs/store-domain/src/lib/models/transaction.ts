import { GenericEntity } from "../generic";

export interface Transaction extends GenericEntity {
  user_created: string;   // char(36)
  date_created: Date;     // datetime
  product: string;        // char(36)
  amount: number;         // integer
  price: number;          // float
  currency: string;       // char(36)
  transaction_type: string; // varchar(255)
  operation: string;      // char(36)
}
