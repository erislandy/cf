import { GenericEntity } from "../generic";
export interface ProductCurrentPrice  extends GenericEntity {
  user_created: string; // char(36)
  date_created: Date;   // datetime
  product: string;      // char(36)
  sell_price: number;   // float
  currency: string;     // char(36)
}
