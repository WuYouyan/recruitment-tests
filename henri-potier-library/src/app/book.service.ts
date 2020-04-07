import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {Book} from './book';
@Injectable({
  providedIn: 'root'
})
export class BookService {

  private booksUrl = 'http://henri-potier.xebia.fr/books'; // URL de La liste des livres Henri Potier

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }
  /* GET books from the server */
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.booksUrl)
      .pipe(
        catchError(this.handleError<Book[]>('getBooks', []))
      );
  }

  /*Search books by filtering books after Get*/
  searchBooks(term: string): Observable<Book[]> {
    return this.getBooks()
      .pipe(
        map(books => books.filter(book => book.title.includes(term))),
        catchError(this.handleError<Book[]>('getBooks', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  /* private log*/
  private log(message: string) {
    console.log(`BookService: ${message}`);
  }

}
