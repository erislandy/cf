import { Injectable } from '@angular/core';
import { EntityType, GenericEntity, GenericRepository } from '@cf/store-domain';
import { BehaviorSubject, catchError, from, map, Observable,  of} from 'rxjs';
import { DirectusService } from './directus.service';
import { readItems } from '@directus/sdk';



@Injectable()
export class GenericService<T extends GenericEntity> extends GenericRepository<T> {
  client: any;
  errAuthNotifier$: BehaviorSubject<{status: number, message: string}> = new BehaviorSubject({status: 0, message: ''});
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
  getErrNotifier(): BehaviorSubject<{status: number, message: string}> {
    return this.errAuthNotifier$;
  }
  getGenerics(entityType: EntityType, queryParams?: Record<string, string>): Observable<T[]> {
    return from(this.client.request(
      readItems(entityType as never, {
        fields: ['*'],
      })
    )).pipe(
      map((response: any) => response),
      catchError((error: {response: {status: number, statusText: string}}) => {       
        console.log({error})
        this.errAuthNotifier$.next({status: error.response.status, message: error.response.statusText});        
        setTimeout(() => this.errAuthNotifier$.next({status: 0, message: ''}), 1000);
        return of([]);
      })
    );
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


