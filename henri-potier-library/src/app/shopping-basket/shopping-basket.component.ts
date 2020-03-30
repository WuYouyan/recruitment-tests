import { Component, OnInit } from '@angular/core';

import {BasketService} from "../basket.service";

@Component({
  selector: 'app-shopping-basket',
  templateUrl: './shopping-basket.component.html',
  styleUrls: ['./shopping-basket.component.css']
})
export class ShoppingBasketComponent implements OnInit {

  items;

  showOffer: boolean = false;

  bestDiscount: string = '0';

  constructor(
    private basket: BasketService
  ) { }

  ngOnInit() {
    this.items = this.basket.getItems();
  }

  get itemsAmount(): number {
    let totalNumber = 0;
    this.items.map(item => totalNumber+=item.number);
    return totalNumber;
  }

  get totalAmount(): number {
    let total = 0 ;
    this.items.map(item => total+=item.price*item.number);
    return total;
  }

  minusOne(item): void {
    item.number--;
  }

  plusOne(item): void {
    item.number++;
  }

  showBestOffer(total: number): void {
    this.showOffer = true;
    let typePercent: number = 0;
    let typeMinus: number = 0;
    let typeSlice: number = 0;
    this.basket.getOffer().subscribe(data => {
      if (!!data.offers){
        let commercialOffers = data.offers;
        commercialOffers.map( offer =>
          {
            if (offer.type == "percentage"){
              typePercent = (offer.value*total*0.01);
            }
            else if (offer.type == "minus"){
              typeMinus = offer.value;
            }
            else if (offer.type == "slice"){
              if (total>=offer.sliceValue){
                typeSlice = offer.value;
              }
            }
            else {}
          }
        );
        this.bestDiscount = Math.max(typePercent, typeMinus, typeSlice)
          .toFixed(2).toString();
        console.log("bestDiscount: ", this.bestDiscount);
      }
      console.log("bestDiscount: ", this.bestDiscount);
    }
    );
  }
  /*showBestOffer(total: number): void {
    this.showOffer = true;
    let typePercent: number = 0;
    let typeMinus: number = 0;
    let typeSlice: number = 0;
    if (this.basket.getOffer().offers){
      let commercialOffers = this.basket.getOffer().offers;
      commercialOffers.map( offer =>
        {
          if (offer.type == "percentage"){
            typePercent = offer.value*total;
          }
          else if (offer.type == "minus"){
            typeMinus = offer.value;
          }
          else if (offer.type == "slice"){
            if (total>=offer.sliceValue){
              typeSlice = offer.value;
            }
          }
          else {}
        }
      );
      this.bestDiscount = Math.max(typePercent, typeMinus, typeSlice);
      console.log("bestDiscount: ", this.bestDiscount);
    }
    console.log("bestDiscount: ", this.bestDiscount);
  }*/

}
