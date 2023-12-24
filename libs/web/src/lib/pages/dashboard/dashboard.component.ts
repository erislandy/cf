import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { VoiceManagerComponent, WindmillHeaderComponent, WindmillSidebarComponent } from '@cf/shared';

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
  toggleSideMenu(){
    this.isSideMenuOpen = !this.isSideMenuOpen; 
    console.log("side menu clicked")
  }
  toggleTheme() {
    this.dark.update((value) => !value); 
    window.localStorage.setItem('dark', this.dark().toString());
  }
}
