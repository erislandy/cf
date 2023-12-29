import { Component, EventEmitter, Input,  LOCALE_ID, Output, inject, signal,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgLoaderComponent } from '../svg-loader/svg-loader.component';
import { VoiceButtonStates, stateOrderAfterClick } from '../../models';
import { final, continuous } from '@ng-web-apis/speech';
import { Subject, debounceTime, map, repeat, retry, tap, timer } from 'rxjs';
import { ExtendedRecognitionService } from '../../services/extended-recognition.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import {  LocalCommandTypes, getLocalCommand } from '../../services/get-local-commands';
import { CommandExecutor } from '../../services/command-executor.service';
import { VoiceLoaderComponent } from '../voice-loader/voice-loader.component';

@Component({
  selector: 'cf-voice-manager',
  standalone: true,
  imports: [CommonModule, SvgLoaderComponent, VoiceLoaderComponent],
  templateUrl: './voice-manager.component.html',
  styleUrl: './voice-manager.component.scss',
  providers: [{
    provide: LOCALE_ID,
    useValue: 'es-ES' // Cambia esto al idioma deseado
  },],
})
export class VoiceManagerComponent {
 

  message = signal('');
 
  @Input() state: VoiceButtonStates = VoiceButtonStates.INACTIVE;
  @Output() stateChanged: EventEmitter<VoiceButtonStates> = new EventEmitter<VoiceButtonStates>();
  eventmessages$ = new Subject<string>();  
  message2 = toSignal<string>(this.eventmessages$.pipe(
    debounceTime(300),
    tap((event) => {
      console.log('after 300', event);
      this.typeText(event);
      this.processEvent(event);
    }),
  ));
  http = inject(HttpClient);
  commandExecutor = inject(CommandExecutor);  
  
  recognitionService = inject(ExtendedRecognitionService)
  status = toSignal<"success" | "error" | "loading" | "initial">(this.commandExecutor.status$.pipe(
    map((status) => status as "success" | "error" | "loading" | "initial")
  ));
 

  stateChangedHandler(oldState: VoiceButtonStates) {
    console.log('stateChangedHandler: ', oldState);
    this.state = stateOrderAfterClick[oldState as keyof typeof stateOrderAfterClick];
    this.stateChanged.emit(this.state);  

    
    if (this.state === VoiceButtonStates.ACTIVE) {
      console.log("Initializing voice comands");
      this.recognitionService.pipe(
        retry(),
        repeat(),
        final(),
        continuous(),
      ).subscribe({
        next: (event) => {         
          
          this.state = VoiceButtonStates.TALKING;
          console.log('event: ', event);
          if(event.length === 0) return;
          const beforeText = event.length > 2 ? event[event.length - 2][0].transcript : '';
          const newText = event[event.length - 1][0].transcript;
          if(newText === this.message() && beforeText !== this.message()) return;
          this.state = VoiceButtonStates.ACTIVE;
          this.commandExecutor.status$.next('loading');
          this.eventmessages$.next(newText);  
  
        },
        error: (error) => {
          console.error('Recognition error:', error);
          this.commandExecutor.status$.next('error');
        },
        complete: () => {
          console.log('Recognition complete');
          this.commandExecutor.status$.next('initial');
        }
      });
    } else {
      this.recognitionService.stop();
    }   
  }
  
  typeText(newText: string) {
    let counter = 0;
    const subs = timer(0, 100).pipe().subscribe(() => {
      counter++;
      this.message.set(newText.substring(0, counter));
      if(counter === newText.length) {
        subs.unsubscribe();
      }
    });    
  }
  processEvent(event: string) {
    
    const localCommad = getLocalCommand(event);
    if(localCommad.isLocalCommand){
      if(localCommad.command === "powerOff"){
        this.recognitionService.stop();
        setTimeout(() => {
          this.stateChangedHandler(VoiceButtonStates.ACTIVE);
          this.commandExecutor.status$.next('success');
        },500);
        return;
      }
        

      if(localCommad.command === "setLanguage") 
        this.recognitionService.changeLanguage() 
        this.commandExecutor.execute(localCommad.command as LocalCommandTypes);
        this.commandExecutor.status$.next('success');
    }  
    else {
      this.commandExecutor.request(event);
    }
  }
}


