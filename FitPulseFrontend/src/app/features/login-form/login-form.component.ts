import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../core/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm!: FormGroup;
  loginError : boolean = false;


  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['']
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      //console.log('LoginFormComponent: Form is valid, attempting login with credentials:', credentials);
      this.loginService.login(credentials).subscribe({
        next: (user) => {
          //console.log('Login successful', user);
          this.router.navigateByUrl('Home');
        },
        error: (err) => {
          this.loginError = true;
          console.log('Log in Error')
          console.log(this.loginError);
        }
      });
    } else {
      
      console.log('LoginFormComponent: Form is invalid');
    }
  }
}
