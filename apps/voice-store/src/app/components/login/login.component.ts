import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '@cf/directus-infrastructure';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'cf-login',
  standalone: true,
  imports: [CommonModule, FormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {
  isIframe = false;
  loginDisplay = false;  
  loading = false;
  email: string = "";
  password: string = "";
  private readonly _destroying$ = new Subject<void>();
  constructor(
    private router: Router,
    private authService: AuthService
   ){

  }
  ngOnInit(): void {    
    console.log("empry");
  }
 
  async loginPopup() {
    this.loading = true;
    try {
      await this.authService.login(this.email, this.password);
      this.router.navigate(['stock']);
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
  }
}

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

}
