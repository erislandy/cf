import { Inject, Injectable } from "@angular/core";
import { REST_API_URL } from "@cf/shared";
import { authentication, createDirectus, rest } from '@directus/sdk';

@Injectable({
    providedIn: 'root',
  })
export class DirectusService {
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
    get Client(){
        return this.client;
    }
    
}