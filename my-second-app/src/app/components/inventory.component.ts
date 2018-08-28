import { Component, OnInit, Output, EventEmitter } from '@angular/core';

export interface LineItem {
  label: string;
  image: string;
  quantity: number;
}

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  //Hardcoded - inventory list
  inventory: LineItem[] = [
    { label: "Acron Squash", image: "acorn_squash.png", quantity: 10 },
    { label: "Broccoli", image: "broccoli.png", quantity: 5 }, 
    { label: "Egg Plant", image: "eggplant.png", quantity: 50 }, 
    { label: "Radish", image: "radish.png", quantity: 5 }, 
    { label: "Zucchini", image: "zucchini.png", quantity: 3 }, 
  ];

  @Output()
  itemSelected = new EventEmitter<string>();

  constructor() { }

  ngOnInit() { }

  processItem(n: number) {
    this.inventory[n].quantity--;
    console.log('inventory: ', this.inventory[n].label);
    //Fire an event - itemSelected
    this.itemSelected.next(this.inventory[n].label);
  }

}
