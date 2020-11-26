import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RegistrationFormDTO } from '../models/registration-form-dto';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http:HttpClient) { }

  registerClient(registrationForm: RegistrationFormDTO){
    return this.http.post(environment.registrationUrl,registrationForm);
  }
}
