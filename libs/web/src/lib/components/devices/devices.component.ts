import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgLoaderComponent } from '@cf/shared';

@Component({
  selector: 'cf-devices',
  standalone: true,
  imports: [CommonModule, SvgLoaderComponent],
  templateUrl: './devices.component.html',
  styleUrl: './devices.component.scss',
})
export class DevicesComponent implements OnChanges{
 
  @Input({ required: true }) devices: Array<{
    id: string;
    nodeRedId: string;
    name: string;
    selected: boolean;
  }> = [];
  @Input() selectedDevices: Array<string | undefined> = [];
  @Input({required: true}) deviceType!: string; 

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['devices'] && changes['devices'].currentValue ) {
      this.devices = changes['devices'].currentValue;
    }
    if(changes['selectedDevices'] && changes['selectedDevices'].currentValue ) {
      this.selectedDevices = changes['selectedDevices'].currentValue;
      this.devices.forEach((device) => {
        device.selected = this.selectedDevices.includes(device.id);
      })
    }
    if(changes['deviceType'] && changes['deviceType'].currentValue ) {
      this.deviceType = changes['deviceType'].currentValue;
    }

  }

  
}
