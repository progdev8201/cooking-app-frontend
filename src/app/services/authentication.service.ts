import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtResponse } from '../models/jwt-response';
import { LoginFormDTO } from '../models/login-form-dto';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private router: Router) { }

  login(loginForm: LoginFormDTO):Observable<boolean>{
    return this.getToken(loginForm).pipe(
      map(response =>{

        if (response && response.token && response.userId) {
          //store data in local storage
          localStorage.setItem('token',response.token);
          localStorage.setItem('userId',response.userId);

          return true;
        }

        return false;
      })
    )
  }
  
  getToken(loginForm: LoginFormDTO):Observable<JwtResponse>{
    return this.http.post<JwtResponse>(environment.loginUrl,loginForm);
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }

}
