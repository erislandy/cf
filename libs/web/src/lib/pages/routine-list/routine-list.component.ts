import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwitchComponent } from "@eg/angular-to-nodered-ui";
import { routines } from '../routine-details/mock-data';
import { RouterModule } from '@angular/router';
import { WebSpeechComponent } from '@engadi-solutions/web-speech';

@Component({
  selector: 'cf-routine-list',
  standalone: true,
  imports: [CommonModule, SwitchComponent, RouterModule, WebSpeechComponent],
  templateUrl: './routine-list.component.html',
  styleUrl: './routine-list.component.scss',
})
export class RoutineListComponent {
  routines: Array<{name: string, id: string}> = [];
  constructor(){    
    this.routines = routines;
  }
}
