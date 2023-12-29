import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject, filter, scan } from "rxjs";
import { LocalCommandTypes } from "./get-local-commands";

@Injectable({
    providedIn: 'root',
})
export class CommandExecutor {
    externalCommand$ = new Subject<LocalCommandTypes | undefined>();
    requestCommand$ = new Subject<string>();  
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