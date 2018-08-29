import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-rsvp',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.css']
})
export class RsvpComponent implements OnInit {

  @ViewChild('rsvpForm')
  rsvpForm: NgForm;

  @ViewChild('nameInput')
  nameInput: NgModel;

  defValue = true;

  constructor() { }

  ngOnInit() { }

  processRSVP(myform: NgForm) {
    console.log('myform: ', myform.value);
    //the form
    console.log('Processing RSVP: ', this.rsvpForm.value);
    for (let i in this.rsvpForm.value) {
      console.log('i = ', i, ', v = ', this.rsvpForm.value[i]);
    }
    this.rsvpForm.resetForm();
  }

}
