import { Component, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { CommandExecutor, LocalCommandTypes, VoiceManagerComponent, WindmillHeaderComponent, WindmillSidebarComponent } from '@cf/shared';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'cf-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    WindmillSidebarComponent,
    WindmillHeaderComponent,
    VoiceManagerComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  isSideMenuOpen = false;
  dark = signal(false);

  commandExecutor = inject(CommandExecutor);
  command = toSignal<LocalCommandTypes | undefined>(this.commandExecutor.externalCommand$);
     
  router = inject(Router);
  constructor(){
    effect(() => {
      console.log("si se ejecuto el comando rutinas: ", this.command())
      if(this.command() && this.command() === LocalCommandTypes.GO_ROUTINES)
        this.router.navigate(['/dashboard/routines']);
      if(this.command() && this.command() === LocalCommandTypes.GO_COMMANDS){
        this.router.navigate(['/dashboard/commands']);
      }
    });
  }
  
  toggleSideMenu(){
    this.isSideMenuOpen = !this.isSideMenuOpen; 
    console.log("side menu clicked")
  }
  toggleTheme() {
    this.dark.update((value) => !value); 
    window.localStorage.setItem('dark', this.dark().toString());
  }
}
