import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationFormDTO } from 'src/app/models/registration-form-dto';
import { RegistrationService } from 'src/app/services/registration.service';
import { MustMatch } from 'src/app/utilities/must-match-validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  emailAlreadyUsed: boolean = false;
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(private formBuilder: FormBuilder,private registrationService: RegistrationService,private router: Router, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) { 
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.init();
  }

  init(){
    this.signupForm = this.formBuilder.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      email: ['',Validators.required],
      password: ['',Validators.required],
      confirmPassword: ['',Validators.required]
    },{
      validator: MustMatch('password','confirmPassword')
    })
    
  }

  getF(){
    return this.signupForm.controls;
  }

  onSubmitForm(){
    if (this.signupForm.valid) {
      
      const formValue = this.signupForm.value;

      const signupForm: RegistrationFormDTO = {
        email: formValue['email'],
        password: formValue['password'],
        firstName: formValue['firstName'],
        lastName: formValue['lastName']
      }

      //sign up client and make sure to handle error
      this.registrationService.registerClient(signupForm).subscribe(() =>{
        this.router.navigate(['/login']);
      },error =>{
        if (error.error.errors[0].field == 'email') {
          this.emailAlreadyUsed = true;
          this.getF().email.setErrors({'emailAlreadyUsed' : true});
        }
      });

    }
  }

}
