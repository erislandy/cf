import { GenericEntity } from "../generic";
export interface Operation  extends GenericEntity {
  user_created: string;   // char(36)
  date_created: Date;     // datetime
  user_updated: string;   // char(36)
  date_updated: Date;     // datetime
  employee: string;       // char(36)
  operation_type: string; // char(36)
}
