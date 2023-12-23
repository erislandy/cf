import { Component, EventEmitter, Input,  LOCALE_ID,  OnInit,  Output, inject, signal,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgLoaderComponent } from '../svg-loader/svg-loader.component';
import { VoiceButtonStates, stateOrderAfterClick } from '../../models';
import { SpeechRecognitionService,  skipUntilSaid,  final, continuous } from '@ng-web-apis/speech';
import { SPEECH_RECOGNITION } from '@ng-web-apis/common';
import { repeat, retry } from 'rxjs';
import { ExtendedRecognitionService } from '../../services/extended-recognition.service';

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
          
          this.message.set(event[event.length - 1][0].transcript);
          console.log('event: ', event);
          this.state = VoiceButtonStates.TALKING;
          setTimeout(() => this.state = VoiceButtonStates.ACTIVE,500)         
  
        },
        error: (error) => console.error('Recognition error:', error),
        complete: () => console.log('Recognition complete'),
      });
    } else {
      console.log("Ya paro");
    }
    

   
  }
}


