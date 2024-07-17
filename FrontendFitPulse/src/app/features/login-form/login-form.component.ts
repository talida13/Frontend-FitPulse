import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TenantService } from 'src/app/core/services/tenant.service';
import { BaseConfigurationComponent } from 'src/app/shared/base-config/baseComponent.component';
import * as shajs from 'sha.js';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent extends BaseConfigurationComponent implements OnInit {
  hide = true;
  loginFormGroup: FormGroup;
  constructor(private formBuilder: FormBuilder, tenantService: TenantService, private readonly router: Router) {
    super(tenantService);
  }

  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  submit(): void {
    const password = this.loginFormGroup.getRawValue().password;
    const username = this.loginFormGroup.getRawValue().username;
    const hashedPassword = shajs('sha256').update(password).digest('hex');
    if (hashedPassword === this.tenant.password && this.tenant.name === username) {
      this.router.navigateByUrl('Dashboard');
    }
    environment.isAdminOn = true;
  }

}
