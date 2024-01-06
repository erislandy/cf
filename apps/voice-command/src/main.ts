import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { enableProdMode } from '@angular/core';
 
if (process.env['NODE_ENV'] === 'production') {
  enableProdMode();
}

// This is defined in our .env file.
console.log('>>> NX_API_URL', process.env['NX_API_URL']);

  
bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);