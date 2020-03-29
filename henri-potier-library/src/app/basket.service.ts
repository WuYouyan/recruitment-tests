import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  items = [];

  constructor(
    private http: HttpClient
  ) { }

  getItems() {
    return this.items;
  }

  addToBasket(item): void {
    if ( !this.itemAlredyInItems(item) ){ // if book is not in items, push it
      item.number = 1; //initialization of number for book
      this.items.push(item);
      console.log("items: ", this.items );
    }
    else {  //if book is already in items, number of this book plus 1
      console.log(" before item number: ", this.items.find(i => i.isbn== item.isbn).number );
      this.items.find(i => i.isbn== item.isbn).number++;
      console.log(" after item number: ", this.items.find(i => i.isbn== item.isbn).number );
    }
  }

  /** Judge if item is in items  */
  itemAlredyInItems(book): boolean {
    return !!this.items.find(item => item.isbn === book.isbn);
  }

  /** Get the offer by selected items*/
  getOffer(): Observable<any> {
    let entireItems: string[] = [];
    this.items.map(
      item => {
        for(let i=0;i<item.number;i++){
          entireItems.push(item.isbn);
        }
      }
    );
    let requestItems: String = entireItems.join(',');
    console.log("requestItems :", requestItems);
    return this.http.get<Observable<any>>(`http://henri-potier.xebia.fr/books/${requestItems}/commercialOffers`)
      .pipe(
        tap(data => console.log("Commercial offers's data: ",data))
      );
  }
  /*getOffer(): any {
    let commercialOffers = {};
    let entireItems: string[] = [];
    this.items.map(
      item => {
        for(let i=0;i<item.number;i++){
          entireItems.push(item.isbn);
        }
      }
    );
    let requestItems: String = entireItems.join(',');
    console.log("requestItems :", requestItems);
    this.http.get<Observable<any>>(`http://henri-potier.xebia.fr/books/${requestItems}/commercialOffers`)
      .pipe(
        tap(data => console.log("data: ",data))
      )
      .subscribe(
          o => {commercialOffers = o}
      );
    return commercialOffers;
  }*/

}
