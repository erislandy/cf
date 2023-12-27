//Export an abstract class named MDBRepository with CRUD methods for the GenericEntity.

import { Observable } from 'rxjs';
import { EntityRepository } from '../base';
import { EntityType, GenericEntity } from './generic.entity';

export abstract class GenericRepository extends EntityRepository {
  abstract getGenerics(entityType: EntityType, area_id: string, queryParams?: Record<string, string>): Observable<any[]>;

  abstract getOneGeneric(key: string, entityType: EntityType, area_id?: string, queryParams?: Record<string, string>): Observable<any>;

  abstract createGeneric(
    Generic: GenericEntity,
    area_id?: string,
  ): Promise<any>;

  abstract updateGeneric(
    Generic: GenericEntity,
    area_id?: string,
  ): Promise<any>;

  abstract deleteGeneric(
    key: string,
    entityType: EntityType,
    area_id?: string,
  ): Promise<boolean>;


  abstract updateGenericInTwin(
    hubDeviceId: string,
    propertyName: string,
    data: { genericId: string, generic?: GenericEntity; }
  ): Promise<boolean>;
}
