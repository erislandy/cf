import { endpoints } from './endpoints';
export const environment = {
  apiUrl: endpoints.azApiUrl,
  production: false,
  msal: {
    clientId: 'dba97ff4-71a1-453c-8102-9d9dd753d83a',
    authority: 'https://login.microsoftonline.com/953d68aa-c13e-49ec-8f12-ebd4e8893d59/',
    redirectUrl: `${endpoints.redirectUrlDev}`,
  },
  envVar: {
    VAR_NAME: "defaultValue"
    /**
     * Add environment variables you want to retrieve from process
     * PORT:4200,
     * VAR_NAME: defaultValue
     */
  }
};
