import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";

import {BookService} from "../book.service";
import {Book} from "../book";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books$: Observable<Book[]>;
  // books: Book[];

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    /*this.books$ = this.getBooks().pipe(
      map(books => {console.log('books: ', books); this.books = books ; return books}),
    ); */
    this.books$ = this.getBooks();
  }

  getBooks(): Observable<Book[]> {
    return this.bookService.getBooks();
  }

  searchBook(input: string): void {
      /*let titles: string[] = this.books.map(book => book.title);
      console.log("searched books :", this.books,"input :", input);
      console.log("titles of books :", titles);
      console.log("searched titles of books(with includes()) :", titles.filter(title => title.includes(input)),"input :", input);
      console.log("searched titles of books(with indexOf()) :", titles.filter(title => title.indexOf(input) > -1),"input :", input);

      this.books$ = of(this.books);*/
      this.books$ = this.bookService.searchBooks(input);
  }

  addToBasket(item: any): void {
    // TODO: add to basket
  }

}
