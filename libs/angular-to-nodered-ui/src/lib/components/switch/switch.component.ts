import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cf-switch',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.scss',
})
export class SwitchComponent  implements OnChanges{
  @Input() state: boolean = true;
  @Input() actionable: boolean = true;
  @Input({transform: toScale}) size: "xs" | "sm" | "md" | "lg" = 'sm';
  @Output() stateChange: EventEmitter<boolean> = new EventEmitter();

  containerClass: string = '';
  handlerClass: string='';
  constructor() {
    this.updateCurrentClass();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['state'] && 'currentValue' in changes['state']) {
      this.state = changes['state'].currentValue;
    }
    if(changes['actionable'] && 'currentValue' in changes['actionable']) {
      this.actionable = changes['actionable'].currentValue;
    }
    if(changes['size'] && 'currentValue' in changes['size']) {
      this.size = changes['size'].currentValue;
    }
    this.updateCurrentClass();
  }

  switchHandler() {
    this.state = !this.state;
    this.stateChange.emit(this.state);
    this.updateCurrentClass();
  }
  updateCurrentClass() {
    const containerClassState = this.state ? 'bg-green-500 justify-end' : 'bg-gray-800 justify-start';
    const containerClassActionable = !this.actionable ? 'pointer-events-none' : 'pointer-events-auto cursor-pointer';
    this.containerClass = `${containerClassState} ${containerClassActionable} ${toScale(this.size)}`;
    this.handlerClass = this.state ? 'left-8 translate-x-1' : 'left-1 ';
 
  }
  
}

function toScale(size: "xs" | "sm" | "md" | "lg"){
  const scales = {
    xs: 'scale-25',
    sm: 'scale-50',
    md: 'scale-75',
    lg: 'scale-100'
  };
  return scales[size];
}
