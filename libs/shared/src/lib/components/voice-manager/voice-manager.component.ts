import { Component, EventEmitter, Input,  Output,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgLoaderComponent } from '../svg-loader/svg-loader.component';
import { VoiceButtonStates, stateOrderAfterClick } from '../../models';

@Component({
  selector: 'cf-voice-manager',
  standalone: true,
  imports: [CommonModule, SvgLoaderComponent],
  templateUrl: './voice-manager.component.html',
  styleUrl: './voice-manager.component.scss',
})
export class VoiceManagerComponent  {
 
  @Input() state: VoiceButtonStates = VoiceButtonStates.INACTIVE;
  @Output() stateChanged: EventEmitter<VoiceButtonStates> = new EventEmitter<VoiceButtonStates>();

  
  stateChangedHandler(oldState: VoiceButtonStates) {
    console.log('stateChangedHandler: ', oldState);
    this.state = stateOrderAfterClick[oldState as keyof typeof stateOrderAfterClick];
    this.stateChanged.emit(this.state);    
   
  }
}


