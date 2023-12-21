import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgLoaderComponent } from '@cf/shared';

@Component({
  selector: 'cf-devices',
  standalone: true,
  imports: [CommonModule, SvgLoaderComponent],
  templateUrl: './devices.component.html',
  styleUrl: './devices.component.scss',
})
export class DevicesComponent {
 
  @Input({ required: true }) devices: Array<{
    id: string;
    nodeRedId: string;
    name: string;
    selected: boolean;
  }> = [];
  @Input({required: true}) deviceType!: string; 
  
}
