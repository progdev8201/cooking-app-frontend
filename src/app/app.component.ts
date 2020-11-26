import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  events: string[] = [];
  opened: boolean;

  constructor(private authService:AuthService,private authentificationService:AuthenticationService,private router:Router){}

  isConnected() : boolean {
    return this.authService.isAuthenticated();
  }

  logout(){
    this.authentificationService.logout();
    this.router.navigate(['/login'])
  }

}
