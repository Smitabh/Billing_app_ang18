import { Component, OnInit } from '@angular/core';
import { BookModel } from 'src/app/model/book.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageService } from 'src/app/services/language.service';
import { BookService } from 'src/app/services/book.service';


@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.sass'
})
export class BookComponent implements OnInit {

  languages: any[] = [];
  selectedLanguageId: string = '';
  errorMessage: string = '';
  successMessage: string = ''
  showDiv: boolean = false;
  hideDiv: boolean = true;
  bookList: BookModel[] = [];
  newBook: BookModel = { bookName: '', bookCode: '', bookCost: 0, bookUnit: '', bookcreatedDate: new Date(), languageId: ''};
  searchTerm: string = '';
  allBooks: any[] = [];  // store all books
  p: number = 1;            // Current page
  itemsPerPage: number = 5; // Show 5 per page

  constructor(private bookService: BookService, private languageService: LanguageService) {}

  ngOnInit(): void {
    this.getAllLanguages();
  }

  getBooks(): void {
   this.bookService.getBooks().subscribe((data) => {
    console.log("Books fetched successfully:", data);
      if (data.length === 0) {
      this.errorMessage = 'Data was not found.!';
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
      return;
    }
      this.allBooks = data;
      this.bookList = data.map((book:any) => {
      const lang = this.languages.find(lang => lang._id === book.languageId);
      return {
        ...book,
        languageName: lang ? lang.languageName : 'Unknown'
      };
      });
      this.errorMessage = '';
   });
  }
  
  getAllLanguages(): void {
    this.languageService.getLanguages().subscribe((data: any[]) => {
      this.languages = data;
       this.getBooks(); 
    }); 
  }

  getLanguageName(languageId: string): string {
    const lang = this.languages.find(l => l._id === languageId);
    return lang ? lang.languageName : 'Unknown';
  }

  validationBook(book: BookModel): string | null {
  if (!book.bookName || book.bookName.trim() === '') {
    return 'Book name is required.';
  }
  if (!book.bookCode || book.bookCode.trim() === '') {
    return 'Book code is required.';
  }
  if (book.bookCost === null || book.bookCost === undefined || book.bookCost <= 0) {
    return 'Book cost must be greater than 0.';
  }
  if (!book.bookUnit || book.bookUnit.trim() === '') {
    return 'Book unit is required.';
  }
  if (!book.languageId) {
    return 'Language is required.';
  }
  if (!book.bookcreatedDate) {
    return 'Book created date is required.';
  }

  return null; 
}

  addBook(): void {
      this.showDiv = true;   
      this.hideDiv = false; 
      this.getAllLanguages();
  }

  saveBook(): void{
    console.log(this.newBook.bookName);
    const error: string | null = this.validationBook(this.newBook);
    if (error) {
      this.errorMessage = error;
      return;
    }
    console.log('data:',{ ...this.newBook});
    this.bookService.saveBook({ ...this.newBook }).subscribe((response:any) => {
      this.successMessage = response.message;
      setTimeout(() => {
        this.successMessage = '';
      }, 2000);
      this.resetForm();
      this.showDiv = false;
      this.hideDiv = true;
      this.getBooks();
    },(err => {
      this.errorMessage = err.error.error;
    }));
  
}

  resetForm(): void {
    this.newBook = {
      bookName: '',
      bookCode: '',
      bookCost: 0,
      bookUnit: '',
      bookcreatedDate: new Date(),
      languageId: ''
    };
    this.errorMessage = '';
  }

  editBook(id: number, book: string): void {

  }

  update(name:string): void {
  }

  deleteBook(id: number): void {

  }

  searchBooks() {
    const term = this.searchTerm.toLowerCase();
    console.log("Searching for term:", term);
    this.bookList = this.allBooks.filter(book =>
      book.bookName.toLowerCase().includes(term) ||
      book.bookCode.toLowerCase().includes(term)
    );
    if (this.bookList.length === 0) {
      this.errorMessage = 'No books found matching the search term.';
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
    } else {
      this.errorMessage = '';
    }   
  }

  get totalPages() {
    return Math.ceil(this.bookList.length / this.itemsPerPage);
  }
}
