import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, filter, scan } from "rxjs";
import { LocalCommandTypes } from "./get-local-commands";

@Injectable({
    providedIn: 'root',
})
export class CommandExecutor {
    externalCommand$ = new BehaviorSubject<LocalCommandTypes | undefined>(undefined);
    requestCommand$ = new BehaviorSubject<string>('');  
    status$ = new BehaviorSubject<string>('');
    execute(command: LocalCommandTypes) {
        this.externalCommand$.next(command);
    }
    request(command: string) {
        this.requestCommand$.next(command);
    }
    getCurrentLanguage(): Observable<string>{
        return this.externalCommand$.asObservable().pipe(
            filter((e:string | undefined ) => !!e && e === 'setLanguage'),
            scan((acc: string) => acc === 'ES' ? 'EN' : 'ES', 'ES')
          )
    }
}