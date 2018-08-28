import { Component } from '@angular/core';

import { ToPrint } from './components/hello.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  listOfNames = [ 'Fred', 'Wilma', 'Barney', 'Betty', 'Bambam', 'Pebbles' ]
  //listOfNames = [];

  toDisplay: string = 'Fred'

  nameSelected(name: string) {
    console.log('clicked: ', name);
    this.toDisplay = name;
  }

  //name is $event - from toPrint.next(this.displayName)
  pleasePrintThis(eventObject: ToPrint) {
    console.log('>>> from app-hello: ', eventObject);

  }
}
