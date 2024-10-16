import { inject, Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { map, catchError, switchMap, filter } from 'rxjs/operators';
import { DirectusService } from './directus.service';
import { readAssetRaw } from '@directus/sdk';

@Injectable({
    providedIn: 'root',
})
export class ImageService {
  private directusService = inject(DirectusService);
  private cache = new Map<string, Observable<string>>();  // Cache para almacenar las URLs obtenidas

  getImageUrl(imageId: string): Observable<string> {
    console.log('Get image url', {imageId});
    const defaultObservable = this.cache.get(imageId) ?? of('assets/1ac73658-8b62-4dea-b6da-529fbc9d01a4');   
    return defaultObservable.pipe(
      switchMap(() => {
          if(this.cache.has(imageId)){
            console.log('checking cache image', {imageId});    
            return this.cache.get(imageId) as Observable<string>;
          }
          return from(this.directusService.Client.request(readAssetRaw(imageId, {
        fit: 'cover',
        width: 200,
        height: 200,
        quality: 100,
          }))).pipe(
            switchMap((response: any) => {
              console.log('Fetch image', {imageId, response});
              const reader = response.getReader();
              const chunks: Uint8Array[] = [];
              return new Observable<Blob>(observer => {
                  function processStream({ done, value }: { done: boolean; value: Uint8Array }) {
                      if (done) {
                        // Creamos el Blob cuando terminamos de leer el stream
                        const blob = new Blob(chunks, { type: 'image/jpeg' }); // Asegúrate de usar el tipo correcto
                        observer.next(blob);
                        observer.complete();
                        return;
                      }
          
                      // Agregamos el chunk a la lista
                      chunks.push(value);
          
                      // Continuamos leyendo el stream
                      reader?.read().then(processStream);
                    }
                  reader?.read().then(processStream);
              })
            }),
            map((blob: any) => URL.createObjectURL(blob)),
            switchMap((res) => {
              const image$ = of(res);
              this.cache.set(imageId,image$);
              return image$;
            }), 
            catchError((error) => {                 
                  console.error('Error fetching image', {imageId, error});
                  return of('assets/1ac73658-8b62-4dea-b6da-529fbc9d01a4');
            }) 
          )
        }),
        
    );
  }
}
