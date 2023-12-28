import { HttpClient } from '@angular/common/http';
import {
  CORE_CUSTOM_CONFIG,
  Configuration,
  GenericRepositoryFactory  
} from "@cf/domain";
import { GenericService } from './services/generic.service';

export const factoriesProviders = [
  {
    provide: GenericRepositoryFactory,
    useFactory: (http: HttpClient, coreConfig: Configuration) =>
      new GenericRepositoryFactory({
        callback: () => {
          return new GenericService(http, coreConfig);
        },
        params: {},
      }),
    deps: [ HttpClient, CORE_CUSTOM_CONFIG],
  }
];
