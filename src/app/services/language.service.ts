import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { languageModel } from '../model/language.model';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private apiUrl = 'http://localhost:8001'; // Change to your backend URL

  constructor(private http: HttpClient) { }

  getLanguages(): Observable<any> {
    return this.http.get('http://localhost:8001/getLanguages');
  }

  addLanguage(data: any) {
    console.log("Adding language with data: ", data);
     return this.http.post('http://localhost:8001/language', data);
  }

  deleteLanguage(language: languageModel): Observable<any> {
    return this.http.delete(`${this.apiUrl}/language/${language._id}`);
  }

  clearLanguages(): Observable<any> {
    return this.http.delete(this.apiUrl);
  }

  updateLanguages(language: languageModel): Observable<any> {
    console.log('Update language with data:', language);
    if (!language.languageName || !language.dateCreated) {
      return throwError("Invalid language data");
    }
    console.log("Updating language with ID:", language._id);
    return this.http.put(`${this.apiUrl}/language/${language._id}`, language);
  }

}
