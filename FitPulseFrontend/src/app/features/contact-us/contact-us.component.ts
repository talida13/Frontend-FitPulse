import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailService } from 'src/app/core/services/email.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private emailService: EmailService, private readonly router: Router ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      message: ['', Validators.required],
      heardAboutUs: ['', Validators.required]
    });
  }

  onSubmit() {
    //console.log("Buton");
    if (this.contactForm.valid) {
      const formValues = this.contactForm.value;

      const emailData = {
        recipientEmail: `${formValues.email}`,
        subject: `Message from ${formValues.name}`,
        body: `
          Name: ${formValues.name}\n
          Email: ${formValues.email}\n
          Phone: ${formValues.phone}\n
          Message: ${formValues.message}\n
          Heard About Us: ${formValues.heardAboutUs}
        `
      };

      this.emailService.sendEmail(emailData).subscribe(
        response => {
          console.log('Email sent successfully', response);
          alert('Email sent successfully');
        },
        error => {
          console.error('Error sending email', error);
          alert('Error sending email');
        }
      );
    } else {
      alert('Please fill in all fields');
    }
  }
}
