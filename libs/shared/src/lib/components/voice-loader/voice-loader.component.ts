import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgLoaderComponent } from '../svg-loader/svg-loader.component';

const stateOperationsIcon = {
  initial: {icon: 'circle', class: 'text-gray-300'},
  loading: {icon: 'loading', class: 'text-orange-400'},
  success: {icon: 'check-circle', class: 'text-green-400'},
  error: {icon: 'x-circle', class: 'text-red-400'}
};

@Component({
  selector: 'cf-voice-loader',
  standalone: true,
  imports: [CommonModule, SvgLoaderComponent],
  templateUrl: './voice-loader.component.html',
  styleUrl: './voice-loader.component.scss',
})
export class VoiceLoaderComponent implements OnChanges {
  
  @Input({required: true}) state: "success" | "error" | "loading" | "initial" = 'initial';
  icon = 'circle';
  currentClass = 'text-gray-300';

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['state'] && changes['state'].currentValue ){
      this.state = changes['state'].currentValue;
      this.icon =stateOperationsIcon[this.state as keyof typeof stateOperationsIcon].icon;
      this.currentClass = stateOperationsIcon[this.state as keyof typeof stateOperationsIcon].class;
    }
  }
}