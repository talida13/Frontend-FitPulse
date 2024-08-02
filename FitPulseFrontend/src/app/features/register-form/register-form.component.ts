import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { LoginService } from '../../core/services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  isLinear = true;
  emailTaken: boolean = false;
  usernameTaken: boolean = false;

  constructor(private fb: FormBuilder, private loginService: LoginService, private readonly router: Router) { }

  ngOnInit(): void {
    this.firstFormGroup = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('^[A-Z][a-zA-Z ]*$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[A-Z][a-zA-Z ]*$')]],
      age: ['', Validators.required ],
      weight: ['', Validators.required],
      height: ['', Validators.required],
      gender: ['', Validators.required]
    });

    this.secondFormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }/*, { validators: this.passwordsMatchValidator }*/);
  }

  /*passwordsMatchValidator: ValidatorFn = (formGroup: AbstractControl): ValidationErrors | null => {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password && confirmPassword && password !== confirmPassword ? { passwordsDoNotMatch: true } : null;
  };*/

  onSubmit() {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid) {
      const formData = {
        username: this.secondFormGroup.value.username,
        password: this.secondFormGroup.value.password,
        email: this.secondFormGroup.value.email,
        firstName: this.firstFormGroup.value.firstName,
        lastName: this.firstFormGroup.value.lastName,
        age: this.firstFormGroup.value.age,
        height: this.firstFormGroup.value.height,
        weight: this.firstFormGroup.value.weight,
        gender: this.firstFormGroup.value.gender
      };

      this.loginService.register(formData).subscribe(
        (response: boolean) => {
          if (response) {
            console.log('Registration successful');
            this.router.navigateByUrl('Login');
          } else {
            console.log('Registration failed');
          }
        },
        (error) => {
          console.log(error.error.details);
          console.error('Error during registration', error);
          if (error.error.details === 'User already registered') 
            this.emailTaken = true;
          if(error.error.details !== 'User already registered')
            this.usernameTaken = true;
        }
      );
    }
  }

  
}
