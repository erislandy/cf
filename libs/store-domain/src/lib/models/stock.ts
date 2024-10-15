import { GenericEntity } from "../generic";
export interface Stock  extends GenericEntity {
  user_created: string; // char(36)
  date_created: Date;   // datetime
  user_updated: string; // char(36)
  date_updated: Date;   // datetime
  product: string;      // char(36)
  amount: number;       // float
}
