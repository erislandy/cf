import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { JwtInterceptor, REST_API_URL } from '@cf/shared';
import { coreConfig } from './config';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async"
import { GenericRepositoryFactory } from '@cf/store-domain';
import { DirectusService, GenericService } from '@cf/directus-infrastructure';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: REST_API_URL,
      useValue: coreConfig.apiUrl,
    },
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: JwtInterceptor, 
      multi: true 
    },
    {
      provide: GenericRepositoryFactory,
      useFactory: (directusService: DirectusService) =>
        new GenericRepositoryFactory({
          callback: () => {
            return new GenericService(directusService);
          },
          params: {},
        }),
      deps: [ DirectusService],
    }
  ],  
};
