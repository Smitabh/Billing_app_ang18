import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  errorMessage : string = '';

  constructor(private fb: FormBuilder, private router: Router,private authService: AuthService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    if (!username && !password) {
      this.errorMessage = 'Username and Password are required';
      return;
    }
    if (!username) {
      this.errorMessage = 'Username is required';
      return;
    }
    if (!password) {
      this.errorMessage = 'Password is required';
      return;
    }
   this.authService.login({ username, password }).subscribe(response => {
      if (response.token) {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/dashboard']);
      } else {
        setTimeout(() => {
          this.errorMessage = 'Invalid credentials';
        }, 3000);
      }
    });
  } 
}
