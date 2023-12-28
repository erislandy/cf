import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommandExecutor } from '../../services/command-executor.service';
import { SvgLoaderComponent } from '../svg-loader/svg-loader.component';

@Component({
  selector: 'cf-windmill-header',
  standalone: true,
  imports: [CommonModule, SvgLoaderComponent],
  templateUrl: './windmill-header.component.html',
  styleUrl: './windmill-header.component.scss',
  animations: 
    [
      trigger('notificationMenutrigger', [
        state('start', style({
          opacity: 1,
          display: 'block'
        })),
        state('end', style({
          opacity: 0,
          display: 'none'
        })),
        transition('start => end', [
          animate('0.15s ease-in')
        ])
      ]) ,
      trigger('isProfileMenutrigger', [
        state('start', style({
          opacity: 1,
          display: 'block'
        })),
        state('end', style({
          opacity: 0,
          display: 'none'
        })),
        transition('start => end', [
          animate('0.15s ease-in')
        ])
      ])  
     
    ]
})
export class WindmillHeaderComponent {
  isNotificationsMenuOpen: boolean = false;
  isProfileMenuOpen: boolean = false;
  dark: boolean = true;
  @Output() menuChanged: EventEmitter<boolean> = new EventEmitter();

  commandExecutor = inject(CommandExecutor);
  languageChanged = toSignal(this.commandExecutor.getCurrentLanguage());

  toggleSideMenu(){
    this.menuChanged.emit(true);
  }
  toggleTheme(){
    this.dark = !this.dark;
    const element = document.querySelector('body');
    if (element) {
      element.classList.toggle('dark');
    }
  }
  toggleNotificationsMenu(){
    this.isNotificationsMenuOpen = !this.isNotificationsMenuOpen;
    console.log("click in notification menu")
  }
  toggleProfileMenu(){
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
    console.log("click in profile menu")
  }
}
