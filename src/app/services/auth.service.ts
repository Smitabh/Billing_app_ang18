import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  response:any;

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    // Dummy login response
     if (credentials.username === 'admin' && credentials.password === 'admin') {
      return of({ token: 'dummy-token', username: 'admin' });
    } else {
      return of({ error: 'Invalid credentials' });
    } 
  /* console.log("Login credentials: ", credentials);
   return this.http.post('http://localhost:8001/login', credentials); */
  }

  register(data: any): Observable<any> {
    // Actual register request
    const json_data = JSON.stringify(data);
    console.log("Registering user with data: ", json_data); 
    return this.http.post('http://localhost:8001/register', data);
  }
}
