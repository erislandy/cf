import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class CommandExecutor {
    externalCommand$ = new BehaviorSubject<string | undefined>(undefined);
    requestCommand$ = new BehaviorSubject<string>('');  
    execute(command: string) {
        this.externalCommand$.next(command);
    }
    request(command: string) {
        this.requestCommand$.next(command);
    }
}