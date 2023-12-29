import { Injectable } from '@angular/core';
import { UseCase } from '../base';
import { EntityType } from './generic.entity';
import { GenericRepository } from './generic.repository';
import { GenericRepositoryFactory } from './generic.repository.factory';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GenericUseCase<T> extends UseCase<GenericRepository<T>> {
  constructor (repositoryFactory: GenericRepositoryFactory<T>) {
    super(repositoryFactory);
  }
  invalidCache() {
    localStorage.setItem('invalidCache', 'true');
  }
  //Implements CRUD methods for GenericEntity
  createGeneric(
    generic: T,
    areaId = ''
  ): Observable<T> {
    return this.getRepository.createGeneric(generic, areaId);
  }

  updateGeneric(
    generic: T,
    areaId: string = ''
  ): Observable<T> {
    return this.getRepository.updateGeneric(generic, areaId);
  }

  deleteGeneric(key: string, entityType: EntityType, areaId: string = ''): Observable<boolean> {
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
    data: { genericId: string, generic?: T; }
  ): Observable<boolean> {
    return this.getRepository.updateGenericInTwin(hubDeviceId, propertyName, data);
  };

  
  processCommand(command: string): Observable<{functionName: string; parameters: object}>{
    return this.getRepository.processCommand(command);
  }
}
