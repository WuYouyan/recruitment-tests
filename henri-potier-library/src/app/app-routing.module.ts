import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BooksComponent} from "./books/books.component";
import {ShoppingBasketComponent} from "./shopping-basket/shopping-basket.component";


const routes: Routes = [
  {path: '', redirectTo: 'books' , pathMatch: 'full'},
  {path: 'books', component: BooksComponent},
  {path: 'shoppingbasket', component: ShoppingBasketComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
