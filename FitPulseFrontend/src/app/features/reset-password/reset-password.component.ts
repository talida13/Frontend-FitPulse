import { Component } from '@angular/core';
import { FormGroup ,FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { LoginService, User, CompleteUser } from 'src/app/core/services/login.service';
import { EmailService } from 'src/app/core/services/email.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit{
  resetForm! : FormGroup
  emailError : boolean = false;
  codeResetInput : boolean = false;
  user!: User;
  nextClicked: number = 0;
  passwordInput: boolean = false;
  codeError:boolean = false;
  completeUser!: CompleteUser ;

  constructor(
    private fb: FormBuilder,
    private readonly router: Router,
    private loginService: LoginService,
    private emailService: EmailService
  ) {}

  ngOnInit(): void {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      code: [''],
      password: ['']
    });
  }

  onReset() :void{
    const mail = this.resetForm.value
        
    const emailData = {
      recipientEmail: `${mail.email}`,
      subject: `oke`,
      body: `oke`
          
    }
    if(this.nextClicked == 0){
      if(this.resetForm.valid){
    
        this.loginService.getUser(mail.email).subscribe({
          next: (user) => {

            this.emailError = false;
            console.log('Email getter succes!');
            alert('Email sent!');
            this.codeResetInput = true;
            this.nextClicked = 1 ;
            this.emailService.sendResetEmail(emailData).subscribe({
              next: (ok) =>{
                console.log('EMAIL FR SENT');
                this.codeResetInput = true;
              },
              error: (errr) =>{
                console.log('EMAIL FR NOT SENT');
              }
            });
          },
          error: (err) => {
            this.emailError = true;
            console.log('Email getter error!')
          }
        });
      }

    }else if(this.nextClicked == 1){
      this.loginService.getUser(mail.email).subscribe(
        user => {
          this.user = user;
          if(mail.code == user.resetCode){
            this.passwordInput = true;
            console.log('VICTORIE')
            this.codeError = false;
            this.nextClicked = 2;
          }
          else {
            this.codeError = true;
            throw new Error('Invalid reset code');
          }
        },
        error => {
          console.error('Error fetching user profile', error);
        }
      )
      //console.log('LoginFormComponent: Form is invalid');
    }else if(this.nextClicked==2){

      this.loginService.getUser(mail.email).subscribe(
        user =>{
        this.completeUser = {...user, password: mail.password}
        console.log(this.resetForm.value.password);
        this.loginService.updateUser(this.completeUser).subscribe(
          next =>{
            console.log('Pasword updated');
            this.router.navigateByUrl('Login');
          },
          error =>{
            console.log('Pasword updated error');
          }
        )
        },
        error =>{
          console.log('Error update password');
        }
      )
    }
  }
}
