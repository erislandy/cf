import { Injectable } from '@angular/core';
import { UseCase } from '../base';
import { EntityType } from './generic.entity';
import { GenericRepository } from './generic.repository';
import { GenericRepositoryFactory } from './generic.repository.factory';
import { BehaviorSubject, Observable } from 'rxjs';

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
    generic: T
  ): Observable<T> {
    return this.getRepository.createGeneric(generic);
  }
  getErrNotifier(): BehaviorSubject<{status: number, message: string}> {
    return this.getRepository.getErrNotifier();
  }

  updateGeneric(
    generic: T
  ): Observable<T> {
    return this.getRepository.updateGeneric(generic);
  }

  deleteGeneric(key: string, entityType: EntityType): Observable<boolean> {
    return this.getRepository.deleteGeneric(key, entityType);
  }

  getGenerics(entityType: EntityType) {
    return this.getRepository.getGenerics(entityType);
  }

  getOneGeneric(key: string, entityType: EntityType) {
    return this.getRepository.getOneGeneric(key, entityType);
  }
  
  processCommand(command: string): Observable<{functionName: string; parameters: object}>{
    return this.getRepository.processCommand(command);
  }
}
