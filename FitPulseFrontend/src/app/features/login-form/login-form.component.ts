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

  constructor( private fb: FormBuilder, private loginService: LoginService,private readonly router: Router ) { 
    
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      this.loginService.login(credentials).subscribe({
        next: (user) => {
          console.log('Login successful', user);
          this.router.navigateByUrl('Home');
        
           localStorage.setItem('jwt', user.jwtToken || '');
           localStorage.setItem("email", user.email);
          
        },
        error: (err) => {
          console.error('Login failed', err);
      
        }
      });
    }
  }
}  