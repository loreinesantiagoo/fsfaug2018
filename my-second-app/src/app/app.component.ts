import { Component, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  shoppingList: string[] = [];

  returnItem = new EventEmitter<string>();

  newItem(item: string) {

    for (let i of this.shoppingList) {
      if (item == i)
        return;
    }

    console.log('>>>> new item: ', item);
    this.shoppingList.push(item);
  }

  deleteItem(item: string) {
    console.log('deleting item: ', item);
    this.returnItem.next(item);
  }

}
