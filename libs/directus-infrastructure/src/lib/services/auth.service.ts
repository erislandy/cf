import { Injectable } from "@angular/core";
import { DirectusService } from "./directus.service";
import { readMe } from "@directus/sdk";

@Injectable({
    providedIn: 'root',
  })
export class AuthService {
    client: any;
    currentUser: any;
    constructor (private _service: DirectusService) {        
        this.client = _service.Client;
    }
    async login(username: string, password: string) {
        try{
            const response = await this.client.login(username, password);           
            localStorage.setItem('accessToken', response.access_token);
            await this.getCurrenntUser();
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
    async getCurrenntUser(){
        if(this.currentUser){
            return this.currentUser;
        }
        this.currentUser = await this.client.request(
            readMe({
                fields: ['*'],
            })
        );
        return this.currentUser;
    }
    
}