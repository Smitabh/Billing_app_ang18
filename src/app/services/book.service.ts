import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
 
  private apiUrl = 'http://localhost:8001'; // Change to your backend URL
 
  constructor(private http: HttpClient) { }
 
 /*  getBooks(): BookItem[] {
    return this.books;
  } */

  getBooks(): Observable<any> {
      return this.http.get('http://localhost:8001/getBooks');
    }

  saveBook(data: any) {
    console.log("Adding data: ", data);
     return this.http.post('http://localhost:8001/book', data);
  }

  clearBook() {
   // this.books = [];
  }
}



