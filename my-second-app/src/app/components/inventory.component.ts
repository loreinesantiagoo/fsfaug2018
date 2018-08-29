import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

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
    { label: "Acron Squash", image: "/assets/fruits/acorn_squash.png", quantity: 10 },
    { label: "Broccoli", image: "/assets/fruits/broccoli.png", quantity: 5 }, 
    { label: "Egg Plant", image: "/assets/fruits/eggplant.png", quantity: 50 }, 
    { label: "Radish", image: "/assets/fruits/radish.png", quantity: 5 }, 
    { label: "Zucchini", image: "/assets/fruits/zucchini.png", quantity: 3 }, 
  ];

  @Output()
  itemSelected = new EventEmitter<string>();

  @Input()
  newInventory: EventEmitter<string>;

  constructor() { }

  //Called when component is created
  ngOnInit() { 
    this.newInventory.subscribe(
      (item) => {
        console.log('New inventory to be added: ', item);
        for (let i of this.inventory)
          if (i.label == item)
            i.quantity++;
      }
    );
  }

  processItem(n: number) {
    this.inventory[n].quantity--;
    console.log('inventory: ', this.inventory[n].label);
    //Fire an event - itemSelected
    this.itemSelected.next(this.inventory[n].label);
  }

}
