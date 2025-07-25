import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { languageModel } from 'src/app/model/language.model';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-language',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './language.component.html',
  styleUrl: './language.component.sass'
})
export class LanguageComponent implements OnInit {
   newLanguage: languageModel = { languageName: '', dateCreated: new Date() };
   languageList: languageModel[] = [];
   //updatedLanguage: languageModel = {};
   errorMessage:string = '';
   successMessage:string = '';
   _id?: number;
   
    showDiv: boolean = false;
    hideDiv: boolean = true;

    constructor(private languageService: LanguageService){}

    ngOnInit(){
     this.getAllLanguages();
    }

  getAllLanguages(): void {
    this.languageService.getLanguages().subscribe((data) => {
      this.languageList = data;
    });
  }

  NewAddLang(): void {
      this.showDiv = true;   
      this.hideDiv = false; 
  }

  private validateLanguageName(name: string, excludeIndex?: number): string | null {
  const trimmedName = name.trim().toLowerCase();
  if (!trimmedName) {
    return 'Language name is required.';
  }
  const exists: boolean = this.languageList.some((lang: languageModel, i: number) =>
    lang.languageName.trim().toLowerCase() === trimmedName &&
    (excludeIndex === undefined || i !== excludeIndex)
  );
  if (exists) {
    return 'Language name already exists!';
  }
  return null;
  }

  addLanguage(): void {
  const error: string | null = this.validateLanguageName(this.newLanguage.languageName);
    if (error) {
      this.errorMessage = error;
      return;
    }
    const trimmedName = this.newLanguage.languageName.trim();
    const formattedDate = new Date().toISOString().slice(0, 10); // 'YYYY-MM-DD'
    this.languageService.addLanguage({ languageName: trimmedName, dateCreated: formattedDate }).subscribe((response:any) => {
       this.successMessage = response.message;
      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
      this.errorMessage = '';
      this.newLanguage.languageName = '';
      this.showDiv = false;
      this.hideDiv = true;
       this.getAllLanguages();
    });
  }
  

  editLanguage(index: number, updatedName: string) {
    console.log("Editing language at index:", index, "with name:", updatedName);
    this.showDiv = true;
    this.hideDiv = false;
    const error = this.validateLanguageName(updatedName, index);
    if (error) {
      this.errorMessage = error;
      return;
    }
    this.newLanguage.languageName = updatedName;
    if (!this.newLanguage.languageName) {
      this.errorMessage = 'Language name cannot be empty.';
      return;
    }
    const trimmedName = updatedName.trim();
    this.languageList[index].languageName = trimmedName;
    this.languageList[index].dateCreated = new Date();

    this.newLanguage = {
    _id: this.languageList[index]._id,              // Make sure _id exists
    languageName: trimmedName,
    dateCreated: this.languageList[index].dateCreated
  };
   
  }

  update(name: string) {
    if(!name){
      this.errorMessage = 'Language name cannot be empty.';
      return;
    }
    this.languageService.updateLanguages(this.newLanguage).subscribe((response) => {
    this.successMessage = response.message;

    // Clear the message after 3 seconds
    setTimeout(() => {
      this.successMessage = '';
    }, 3000);

      this.errorMessage = '';
      this.showDiv = false;
      this.hideDiv = true;
      this.getAllLanguages();
    });
  }

  deleteLanguage(index: number) {
    this.languageService.deleteLanguage(this.languageList[index]).subscribe((response) => {
      this.successMessage = response.message;
      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
      this.getAllLanguages();
    });
  }

}