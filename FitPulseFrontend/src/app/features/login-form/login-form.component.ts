import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../core/services/login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm!: FormGroup;

  constructor( private fb: FormBuilder, private loginService: LoginService ) { 
    
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
          // Poți stoca JWT token-ul și naviga spre o altă pagină dacă este necesar
          // localStorage.setItem('jwt', user.jwtToken || '');
        },
        error: (err) => {
          console.error('Login failed', err);
          // Afișează un mesaj de eroare utilizatorului
        }
      });
    }
  }
}  