//Export an abstract class named MDBRepository with CRUD methods for the GenericEntity.

import { Observable } from 'rxjs';
import { EntityRepository } from '../base';
import { EntityType } from './generic.entity';

export abstract class GenericRepository<T> extends EntityRepository {
  abstract getGenerics(entityType: EntityType, queryParams?: Record<string, string>): Observable<T[]>;

  abstract getOneGeneric(key: string, entityType: EntityType, queryParams?: Record<string, string>): Observable<T>;

  abstract createGeneric(
    Generic: T
  ): Observable<T>;

  abstract updateGeneric(
    Generic: T
  ): Observable<T>;

  abstract deleteGeneric(
    key: string,
    entityType: EntityType
  ): Observable<boolean>;

  abstract processCommand(command: string): Observable<{functionName: string; parameters: object}>;
}
