//import { env } from 'process';
import { endpoints } from './endpoints';
export const environment = {
  production: true,
  apiUrl: endpoints.azApiUrl,
  msal: {
    clientId: 'dba97ff4-71a1-453c-8102-9d9dd753d83a',
    authority: 'https://login.microsoftonline.com/953d68aa-c13e-49ec-8f12-ebd4e8893d59/',
    redirectUrl: `${endpoints.redirectUrlProd}`
  }
};

