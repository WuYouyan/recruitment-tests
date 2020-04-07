import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';

import {BookService} from '../book.service';
import {Book} from '../book';
import {BasketService} from '../basket.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books$: Observable<Book[]>;

  constructor(
    private bookService: BookService,
    private basketService: BasketService
    ) { }

  ngOnInit(): void {
    this.books$ = this.getBooks();
  }

  getBooks(): Observable<Book[]> {
    return this.bookService.getBooks();
  }

  searchBook(input: string): void {
      this.books$ = this.bookService.searchBooks(input);
  }

  addToBasket(book: Book): void {
    this.basketService.addToBasket(book);
  }

}
