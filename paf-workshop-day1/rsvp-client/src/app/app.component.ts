import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RSVPService, RSVP } from './rsvp.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private rsvpSvc: RSVPService) { }

  rsvp(rsvpForm: NgForm) {
    console.info('> values: ', rsvpForm.value);
    this.rsvpSvc.rsvp(rsvpForm.value as RSVP)
      .then(result => {
        console.info('result: ', result);
        rsvpForm.resetForm();
      })
  }
}
