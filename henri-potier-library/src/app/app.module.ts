import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import { ShoppingBasketComponent } from './shopping-basket/shopping-basket.component';
import { HomepageComponent } from './homepage/homepage.component';
import { TopBarComponent } from './top-bar/top-bar.component';

import { SimplifiedPipe } from './simplified.pipe';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    ShoppingBasketComponent,
    HomepageComponent,
    TopBarComponent,
    SimplifiedPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
