//Export an abstract class named MDBRepository with CRUD methods for the GenericEntity.

import { Observable } from 'rxjs';
import { EntityRepository } from '../base';
import { EntityType } from './generic.entity';

export abstract class GenericRepository<T> extends EntityRepository {
  abstract getGenerics(entityType: EntityType, area_id: string, queryParams?: Record<string, string>): Observable<T[]>;

  abstract getOneGeneric(key: string, entityType: EntityType, area_id?: string, queryParams?: Record<string, string>): Observable<T>;

  abstract createGeneric(
    Generic: T,
    area_id?: string,
  ): Observable<T>;

  abstract updateGeneric(
    Generic: T,
    area_id?: string,
  ): Observable<T>;

  abstract deleteGeneric(
    key: string,
    entityType: EntityType,
    area_id?: string,
  ): Observable<boolean>;


  abstract updateGenericInTwin(
    hubDeviceId: string,
    propertyName: string,
    data: { genericId: string, generic?: T; }
  ): Observable<boolean>;
}
