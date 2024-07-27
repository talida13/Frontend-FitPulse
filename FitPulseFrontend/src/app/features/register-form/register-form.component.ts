import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../core/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isLinear = true;

  constructor(private fb: FormBuilder, private loginService: LoginService,private readonly router: Router) {
    this.firstFormGroup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      weight: ['', Validators.required],
      height: ['', Validators.required],
      gender: ['', Validators.required]
    });
    this.secondFormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }
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
      };
  
      this.loginService.register(formData).subscribe(
        (response: boolean) => {
          if (response) {
            console.log('Registration successful');
            // Poți adăuga aici logica pentru redirecționare sau afișarea unui mesaj de succes
            this.router.navigateByUrl('Login');
          } else {
            console.log('Registration failed');
            // Poți adăuga aici logica pentru afișarea unui mesaj de eroare
          }
        },
        (error) => {
          console.error('Error during registration', error);
          // Poți adăuga aici logica pentru gestionarea erorilor
        }
      );
    }
  }
  
  



  
}
