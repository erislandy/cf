/* eslint-disable @typescript-eslint/no-explicit-any */
import { InjectionToken } from '@angular/core';

export const CORE_CUSTOM_CONFIG = new InjectionToken('coreCustomConfig');


export interface Configuration {
  apiUrl: {
    commandsNotifications: string,
    crudsAzureFunctions: string
  };
  appName: string;
}
