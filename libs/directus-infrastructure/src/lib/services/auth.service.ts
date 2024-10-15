import { Injectable } from "@angular/core";
import { DirectusService } from "./directus.service";

@Injectable({
    providedIn: 'root',
  })
export class AuthService {
    client: any;
    constructor (private _service: DirectusService) {        
        this.client = _service.Client;
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