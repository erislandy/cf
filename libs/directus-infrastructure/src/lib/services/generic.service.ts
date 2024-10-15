import { Injectable } from '@angular/core';
import { EntityType, GenericEntity, GenericRepository } from '@cf/store-domain';
import { Observable,  of} from 'rxjs';
import { DirectusService } from './directus.service';



@Injectable({
  providedIn: 'root',
})
export class GenericService<T extends GenericEntity> extends GenericRepository<T> {
  client: any;
  deleteGeneric(id: string, entityType: EntityType): Observable<boolean> {
      return of(true);
  }

  constructor (private _service: DirectusService) {
    super();
    this.client = _service.Client;
  }
  public getRepositoryName(): string {
    return 'GenericRepository';
  }
  getGenerics(entityType: EntityType, queryParams?: Record<string, string>): Observable<T[]> {
    return of([]);
  }
  getOneGeneric(key: string, entityType: EntityType): Observable<T> {
    return of({} as T);
  }
  createGeneric(entity: T): Observable<T> {
    return  of({} as T);
  }
  updateGeneric(entity: T): Observable<T> {
    return of({} as T);  
  }

 

  processCommand(command: string): Observable<{functionName: string; parameters: object}> {
    return of({functionName: '', parameters: {}});
  }
}


