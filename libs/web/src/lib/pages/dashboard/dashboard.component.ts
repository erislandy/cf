import { Component, inject, signal, effect, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { CommandExecutor, LocalCommandTypes, VoiceManagerComponent, WindmillHeaderComponent, WindmillSidebarComponent } from '@cf/shared';
import { toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

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
export class DashboardComponent implements OnInit{
  isSideMenuOpen = false;
  dark = signal(false);

  commandExecutor = inject(CommandExecutor);
     
  router = inject(Router);
  ngOnInit(): void {
    this.commandExecutor.externalCommand$.subscribe((command) => {
      console.log("si se ejecuto el comando rutinas: ", command)
      if(command && command === LocalCommandTypes.GO_ROUTINES)
        this.router.navigate(['/dashboard/routines']);
      if(command && command === LocalCommandTypes.GO_COMMANDS){
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
