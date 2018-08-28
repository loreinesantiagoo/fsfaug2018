import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  shoppingList: string[] = [];

  newItem(item: string) {
    console.log('>>>> new item: ', item);
    this.shoppingList.push(item);
  }
}
