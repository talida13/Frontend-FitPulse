import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  registerFormGroup: FormGroup;
  hide1 = true;
  hide = true;
  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.registerFormGroup = this.formBuilder.group({
      fullName: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      year: new FormControl('', Validators.required),
      group: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  submit(): void {
    if (this.registerFormGroup.valid) {
      if (!this.validatePassword()) {
        this._snackBar.open("Password doesn't match!", 'Close');
      } else {
        console.log('E good');
      }
    }
  }

  private validatePassword(): boolean {
    return this.registerFormGroup.controls['password'].value ===
      this.registerFormGroup.get('confirmPassword').value
      ? true
      : false;
  }
}
