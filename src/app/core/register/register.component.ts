

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  standalone:true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit{
  registerForm!: FormGroup;
  submitted = false;

  ngOnInit() {
    this.registerForm = this.fb.group({
      title:['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, this.strictEmailValidator]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordsMatchValidator });
  }

  
  constructor(private fb:FormBuilder, private router: Router, private authService: AuthService){
  }

  strictEmailValidator(control: AbstractControl): ValidationErrors | null {
    /*In Angular forms, FormGroup, FormControl, and FormArray all extend a base class called AbstractControl.
     So when we define a custom validator for a FormGroup, we type the parameter as AbstractControl because:
     Angular passes a FormGroup to the validator. Since FormGroup is a subtype of AbstractControl, using AbstractControl makes 
     the validator generic and reusable.It allows the function to work with any control, not just FormGroup. */

    const email = control.value;
    if (!email) return null;
  
    const strictPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|net|org)$/i;
    return strictPattern.test(email) ? null : { invalidEmailDomain: true };
  }
  
  passwordsMatchValidator(group: AbstractControl): { [key: string]: any } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  get f(){
    return this.registerForm.controls;
  } 

  register() {
    debugger;
      this.submitted = true;
     if (this.registerForm.invalid) return;

      this.authService.register({ ...this.registerForm.value }).subscribe(response => {
        alert(response.message);
        console.log("Registration successful:", response);
        this.router.navigate(['/login']);
      }, (err => {
        console.log("Error: ", err);
      }));
    }

}
