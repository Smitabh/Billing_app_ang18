import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    // Dummy login response
    if (credentials.username === 'admin' && credentials.password === 'admin') {
      return of({ token: 'dummy-token', username: 'admin' });
    } else {
      return of({ error: 'Invalid credentials' });
    }
  }

  register(data: any): Observable<any> {
    // Dummy register response
    return of({ message: 'Registration successful' });
  }
}
