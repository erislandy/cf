import { GenericEntity } from "../generic";

export interface Employee extends GenericEntity{
  user_created: string; // char(36)
  date_created: Date;   // datetime
  user_updated: string; // char(36)
  date_updated: Date;   // datetime
  name: string;         // varchar(255)
  role: string;         // varchar(255)
}
