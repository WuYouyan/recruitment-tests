import { Component, OnInit } from '@angular/core';

import {BasketService} from '../basket.service';

@Component({
  selector: 'app-shopping-basket',
  templateUrl: './shopping-basket.component.html',
  styleUrls: ['./shopping-basket.component.css']
})
export class ShoppingBasketComponent implements OnInit {

  items;

  showOffer = false;

  bestDiscount = '0';

  finalAmount: number;

  constructor(
    private basket: BasketService
  ) { }

  ngOnInit() {
    this.items = this.basket.getItems();
  }

  get itemsAmount(): number {
    let totalNumber = 0;
    this.items.map(item => totalNumber += item.number);
    return totalNumber;
  }

  get totalAmount(): number {
    let total = 0 ;
    this.items.map(item => total += item.price * item.number);
    return total;
  }

  minusOne(item): void {
    item.number--;
    this.showOffer = false;
  }

  plusOne(item): void {
    item.number++;
    this.showOffer = false;
  }

  showBestOffer(total: number): void {
    this.showOffer = true;
    let typePercent = 0;
    let typeMinus = 0;
    let typeSlice = 0;
    this.basket.getOffer().subscribe(data => {
      if (!!data.offers) {
        const commercialOffers = data.offers;
        commercialOffers.map( offer => {
            if (offer.type === 'percentage') {
              typePercent = (offer.value * total * 0.01);
            } else if (offer.type === 'minus') {
              typeMinus = offer.value;
            } else if (offer.type === 'slice') {
              if (total >= offer.sliceValue) {
                typeSlice = offer.value;
              }
            } else {}
          }
        );
        this.bestDiscount = Math.max(typePercent, typeMinus, typeSlice)
          .toFixed(2).toString();
      }
      this.finalAmount = this.totalAmount - Number(this.bestDiscount);
    }
    );
  }

}
