import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtResponse } from 'src/app/models/jwt-response';
import { LoginFormDTO } from 'src/app/models/login-form-dto';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginPassed: boolean = true;

  constructor(private formBuilder: FormBuilder, private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  getF() {
    return this.loginForm.controls;
  }

  onSubmitForm() {
    if (this.loginForm.valid) {

      const formValue = this.loginForm.value;

      // get data from form
      const loginForm: LoginFormDTO = {
        email: formValue['email'],
        password: formValue['password']
      }

      //call login service
      this.authenticationService.login(loginForm).subscribe((response) => {
        if (response)
          this.router.navigate(['/home']);
        else {
          this.loginPassed = false;
          this.getF().email.setErrors({ badCredentials: true });
          this.getF().password.setErrors({ badCredentials: true });
        }
      }, error => {
        this.loginPassed = false;
        this.getF().email.setErrors({ badCredentials: true });
        this.getF().password.setErrors({ badCredentials: true });
      });

    }
  }

}
