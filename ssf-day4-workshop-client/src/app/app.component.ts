import { Component } from '@angular/core';
import {Item} from './model';
import {CartService} from './cart.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  items: string[] = [];

  constructor(private cartSvc: CartService) {}

  newItem(item: string) {
    console.log('item: ', item);
    this.items.unshift(item);
  }

  loadCart(name: string) {
    this.cartSvc.loadCart(name)
      .then(cart => {
        this.items = cart.content;
      })
  }

  saveCart(name: string) {
    this.cartSvc.saveCart({
      name: name,
      content: this.items
    }).catch((err: HttpErrorResponse) => {
      if (err.status == 409) {
        alert("Your cart is empty")
        return;
      }
      alert(err.message);
    })
  }
}
