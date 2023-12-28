import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Configuration, EntityType, GenericEntity, GenericRepository } from '@cf/domain';
import { Observable,  map } from 'rxjs';


@Injectable()
export class GenericService<T extends GenericEntity> extends GenericRepository<T> {
  private TABLE_MAPPINGS = new Map<string, string>([
    [ EntityType.USERS_AD, 'SecurityCRUD_V2' ],
    [ EntityType.ROLE, 'SecurityCRUD_V2' ],
    [ EntityType.ACTION, 'SecurityCRUD_V2' ]
  ]);
  commandsUrl: string;
  apiUrl: {
    commandsNotifications: string,
    crudsAzureFunctions: string
  };
  updateGenericInTwin(hubDeviceId: string, propertyName: string, data: { genericId: string, generic?: T; }): Observable<boolean> {
    return  this.http.post<T>(`${this.commandsUrl}?hubDeviceId=${hubDeviceId}`, {
        properties: {
          desired: {
            [ propertyName ]: {
              [ data.genericId ]: data.generic ?? null
            }
          },
        },
      })
      .pipe(map(() => true));
  }

  deleteGeneric(id: string, entityType: EntityType, areaId?: string): Observable<boolean> {
    return this.http.post<T>(`${this.getURL('delete', entityType, areaId)}&id=${id}`, null)
        .pipe(map(() => true))    
  }

  constructor (
    private http: HttpClient,
    @Inject('CORE_CUSTOM_CONFIG') private _config: Configuration
  ) {
    super();
    this.apiUrl = this._config.apiUrl;
    console.log('apiUrl', this.apiUrl);
    this.commandsUrl = this.apiUrl.commandsNotifications + '/DesiredActuatorState';
  }
  public getRepositoryName(): string {
    return 'GenericRepository';
  }
  getGenerics(entityType: EntityType, area_id: string, queryParams?: Record<string, string>): Observable<T[]> {
    return this.http.get<T[]>(this.getURL('getAll', entityType, area_id, queryParams));
  }
  getOneGeneric(key: string, entityType: EntityType, area_id?: string): Observable<T> {
    return this.http.get<T>(`${this.getURL('getOne', entityType, area_id)}&id=${key}`);
  }
  createGeneric(entity: T, area_id?: string): Observable<T> {
    return  this.http.post<T>(this.getURL('create', entity.entityType, area_id), entity);    
  }
  updateGeneric(entity: T, area_id: string): Observable<T> {
    return this.http
        .post<T>(this.getURL('update', entity.entityType, area_id), entity);    
  }

  getURL(operation: string, entityType: string, areaId?: string, queryParams?: Record<string, string>): string {
    const table = this.TABLE_MAPPINGS.get(entityType) || 'MainEntityCRUD';
    const urlParts = [ `${this.apiUrl.crudsAzureFunctions}/${table}?operation=${operation}&entityType=${entityType}` ];

    if (areaId) {
      urlParts.push(`&area_id=${areaId}`);
    }
    if (queryParams) {
      urlParts.push(
        ...Object.entries(queryParams).map(
          ([ key, value ]) => `&${key}=${value}`
        )
      );
    }
    return urlParts.join('');
  }
}
