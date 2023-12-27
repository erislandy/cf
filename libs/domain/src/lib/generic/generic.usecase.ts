import { Injectable } from '@angular/core';
import { UseCase } from '../base';
import { EntityType, GenericEntity } from './generic.entity';
import { GenericRepository } from './generic.repository';
import { GenericRepositoryFactory } from './generic.repository.factory';

@Injectable({
  providedIn: 'root',
})
export class GenericUseCase extends UseCase<GenericRepository> {
  constructor (repositoryFactory: GenericRepositoryFactory) {
    super(repositoryFactory);
  }
  invalidCache() {
    localStorage.setItem('invalidCache', 'true');
  }
  //Implements CRUD methods for GenericEntity
  createGeneric(
    generic: GenericEntity | any,
    areaId = ''
  ): Promise<any> {
    return this.getRepository.createGeneric(generic, areaId);
  }

  updateGeneric(
    generic: GenericEntity,
    areaId: string = ''
  ): Promise<any> {
    return this.getRepository.updateGeneric(generic, areaId);
  }

  deleteGeneric(key: string, entityType: EntityType, areaId: string = ''): Promise<boolean> {
    return this.getRepository.deleteGeneric(key, entityType, areaId);
  }

  getGenerics(entityType: EntityType, areaId: string = '') {
    return this.getRepository.getGenerics(entityType, areaId);
  }

  getOneGeneric(key: string, entityType: EntityType, areaId: string = '') {
    return this.getRepository.getOneGeneric(key, entityType, areaId);
  }

  updateGenericInTwin(
    hubDeviceId: string,
    propertyName: string,
    data: { genericId: string, generic?: GenericEntity; }
  ): Promise<boolean> {
    return this.getRepository.updateGenericInTwin(hubDeviceId, propertyName, data);
  };
}
