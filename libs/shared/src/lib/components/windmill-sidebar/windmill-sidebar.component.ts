import { Component,  EventEmitter,  Input,  Output,  signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'cf-windmill-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './windmill-sidebar.component.html',
  styleUrl: './windmill-sidebar.component.scss',
  animations: 
    [
      trigger('openClose', [
        // ...
        state('open', style({
          opacity: 1,
          transform: 'translateX(0)'
        })),
        state('closed', style({
          opacity: 0,
          transform: 'translateX(-256px)'
        })),
        transition('open => closed', [
          animate('1s ease-in-out')
        ]),
        transition('closed => open', [
          animate('0.5s ease-in-out')
        ]),
      ]),
      trigger('show', [
        // ...
        state('open', style({
          opacity: 1,
        })),
        state('closed', style({
          opacity: 0,
        })),
        transition('open => closed', [
          animate('0.5s ease-in-out')
        ]),
        transition('closed => open', [
          animate('0.5s ease-in-out')
        ]),
      ]),
    ]
})
export class WindmillSidebarComponent {
  @Input() isSideMenuOpen: boolean = false;
  @Output() toggleSideMenu: EventEmitter<boolean> = new EventEmitter(); 
  isPagesMenuOpen = signal(false)
  constructor(){    
  }

  togglePagesMenu(){
    this.isPagesMenuOpen.update((value) => !value); 
  }
}
