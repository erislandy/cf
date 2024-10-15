import { InjectionToken } from '@angular/core';

export const REST_API_URL = new InjectionToken<string>('rest.api.url');

export interface Configuration {
  apiUrl: string;
}
