import { Component, EventEmitter, Input,  LOCALE_ID, Output, inject, signal,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgLoaderComponent } from '../svg-loader/svg-loader.component';
import { VoiceButtonStates, stateOrderAfterClick } from '../../models';
import { final, continuous } from '@ng-web-apis/speech';
import { Subject, debounceTime, repeat, retry, tap, timer } from 'rxjs';
import { ExtendedRecognitionService } from '../../services/extended-recognition.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'cf-voice-manager',
  standalone: true,
  imports: [CommonModule, SvgLoaderComponent],
  templateUrl: './voice-manager.component.html',
  styleUrl: './voice-manager.component.scss',
  providers: [{
    provide: LOCALE_ID,
    useValue: 'es-ES' // Cambia esto al idioma deseado
  },],
})
export class VoiceManagerComponent  {

  message = signal('');
 
  @Input() state: VoiceButtonStates = VoiceButtonStates.INACTIVE;
  @Output() stateChanged: EventEmitter<VoiceButtonStates> = new EventEmitter<VoiceButtonStates>();
  eventmessages$ = new Subject<string>();  
  message2 = toSignal<string>(this.eventmessages$.pipe(
    debounceTime(300),
    tap((event) => {
      console.log('after 300', event);
      this.typeText(event);
      if(event.trim().toLocaleLowerCase().includes('apagar')) {
        this.recognitionService.stop();
        setTimeout(() =>this.stateChangedHandler(VoiceButtonStates.ACTIVE),500);
      }
    }),
  ));

  recognitionService = inject(ExtendedRecognitionService)
  
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
          setTimeout(() => this.state = VoiceButtonStates.ACTIVE,500)     
          console.log('event: ', event);
          if(event.length === 0) return;
          const newText = event[event.length - 1][0].transcript;
          if(newText === this.message()) return;
          
          this.eventmessages$.next(newText);  
  
        },
        error: (error) => console.error('Recognition error:', error),
        complete: () => console.log('Recognition complete'),
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
}


