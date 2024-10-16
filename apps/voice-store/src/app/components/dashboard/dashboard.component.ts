import { Component, inject, signal,  OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { 
  VoiceManagerComponent,
  //CommandExecutor, LocalCommandTypes, VoiceManagerComponent,
   WindmillHeaderComponent, WindmillSidebarComponent } from '@cf/shared';
import { GenericUseCase } from '@cf/store-domain';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cf-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    WindmillSidebarComponent,
    WindmillHeaderComponent,
    VoiceManagerComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }
  isSideMenuOpen = false;
  dark = signal(false);
  //commandExecutor = inject(CommandExecutor);
  router = inject(Router);
  _generic = inject(GenericUseCase);
  _sub: Subscription = new Subscription()
  ngOnInit(): void {
    this._sub.add(this._generic.getErrNotifier().subscribe((err) => {
      if(err.status === 401){
        localStorage.clear();
        this.router.navigateByUrl('/login');
      }
    }));
    /*
    this.commandExecutor.externalCommand$.subscribe((command) => {
      console.log("si se ejecuto el comando rutinas: ", command)
      if(command && command === LocalCommandTypes.GO_ROUTINES)
        this.router.navigate(['/dashboard/routines']);
      if(command && command === LocalCommandTypes.GO_COMMANDS){
        this.router.navigate(['/dashboard/commands']);
      }
    });*/
    console.log("Stock component initialized")
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
