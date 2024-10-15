import { Inject, Injectable } from "@angular/core";
import { REST_API_URL } from "@cf/shared";
import { authentication, createDirectus, rest } from '@directus/sdk';

@Injectable({
    providedIn: 'root',
  })
export class AuthService {
    client: any;
    constructor (@Inject(REST_API_URL) private _apiUrl: string) {        
        this.client = createDirectus(_apiUrl)
            .with(authentication('cookie', { credentials: 'include' }))
            .with(rest({ credentials: 'include' }));
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            this.client.setToken(accessToken);
        }
    }
    async login(username: string, password: string) {
        try{
            const response = await this.client.login(username, password);
            console.log({response});
            localStorage.setItem('accessToken', response.access_token);
            return response;

        } 
        catch (error) {
            console.error(error);
            return error;
        }
    
    }
    async logout() {
        // implementation
    }
    
}