import { GenericEntity } from "../generic";

export interface Currency extends GenericEntity { 
  name: string;         // varchar(255)
  acronym: string;      // varchar(255)
}
