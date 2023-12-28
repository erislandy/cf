import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async"
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MsalInterceptor, MSAL_INSTANCE, MsalInterceptorConfiguration, MsalGuardConfiguration, MSAL_GUARD_CONFIG, MSAL_INTERCEPTOR_CONFIG, MsalService, MsalGuard, MsalBroadcastService } from '@azure/msal-angular';
import { IPublicClientApplication, PublicClientApplication, InteractionType, BrowserCacheLocation, LogLevel, BrowserUtils } from '@azure/msal-browser';
import { withDisabledInitialNavigation, withEnabledBlockingInitialNavigation } from '@angular/router';
import { environment } from '../environments/environment';
import { CustomNameInterceptor } from './interceptors/custom-name.interceptor';
import { coreConfig } from "./config";
import { CORE_CUSTOM_CONFIG } from '@cf/domain';
import { factoriesProviders } from '@cf/ifrastructure';

export function loggerCallback(logLevel: LogLevel, message: string) {
  console.log(message);
}

export function MSALInstanceFactory(): IPublicClientApplication {
  console.log({msal: environment.msal})
  return new PublicClientApplication({
    auth: {
      clientId: environment.msal.clientId,
      authority: environment.msal.authority,
      redirectUri: environment.msal.redirectUrl,
      postLogoutRedirectUri: environment.msal.redirectUrl
    },
    cache: { 
      cacheLocation: BrowserCacheLocation.LocalStorage
    },
    system: {
      allowNativeBroker: false, // Disables WAM Broker
      loggerOptions: {
        loggerCallback,
        logLevel: LogLevel.Info,
        piiLoggingEnabled: false
      }
    }
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map([
    [ coreConfig.apiUrl.crudsAzureFunctions, [ 'user.read' ] ],
    [ coreConfig.apiUrl.commandsNotifications, [ 'user.read' ] ],
  ]);
  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return { 
    interactionType: InteractionType.Popup,
    authRequest: {
      scopes: ['openid', 'profile', 'User.Read']
    },
    loginFailedRoute: '/login'
  };
}

const initialNavigation = !BrowserUtils.isInIframe() && !BrowserUtils.isInPopup() 
  ? withEnabledBlockingInitialNavigation() // Set to enabledBlocking to use Angular Universal
  : withDisabledInitialNavigation();
  

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, initialNavigation),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomNameInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
  },
  {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
  },
  {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory
  },
  {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory
  },
  MsalService,
  MsalGuard,
  MsalBroadcastService,
  {
    provide: CORE_CUSTOM_CONFIG,
    useValue: coreConfig
  },
  ...factoriesProviders
  ],
};
