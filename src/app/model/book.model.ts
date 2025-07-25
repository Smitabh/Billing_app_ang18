export interface BookModel {
  id?: number;
  bookName:string;
  bookCode:string
  bookCost:number;
  bookUnit: string; // e.g., 'Rs', 'USD'
  bookcreatedDate:Date;
  languageId: string; // reference to Language.languageName
}