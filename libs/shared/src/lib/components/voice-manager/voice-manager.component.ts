import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgLoaderComponent } from '../svg-loader/svg-loader.component';

@Component({
  selector: 'cf-voice-manager',
  standalone: true,
  imports: [CommonModule, SvgLoaderComponent],
  templateUrl: './voice-manager.component.html',
  styleUrl: './voice-manager.component.scss',
})
export class VoiceManagerComponent {

}
