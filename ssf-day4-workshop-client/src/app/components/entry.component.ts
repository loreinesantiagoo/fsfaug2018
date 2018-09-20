import {Component, OnInit, ViewChild, EventEmitter, Output, ElementRef} from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import {Item} from '../model';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {

  @ViewChild('form') form: NgForm;
  @ViewChild('nameField') nameField: ElementRef;
  @ViewChild('itemField') itemField: NgModel;

  @Output() newItem = new EventEmitter<string>();
  @Output() loadCart = new EventEmitter<string>();
  @Output() saveCart = new EventEmitter<string>();

  constructor() { }

  ngOnInit() { }

  addToCart() {
    this.newItem.next(this.form.value.item);
    this.itemField.reset();
  }

  load() {
    this.loadCart.next(this.nameField.nativeElement.value);
  }
  save() {
    this.saveCart.next(this.nameField.nativeElement.value);
  }

}
