import {Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

import {GiphyService, SearchResult} from './giphy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('form') form: NgForm;

  result: SearchResult;

  constructor(private giphySvc: GiphyService) { }

  doSearchWithObservable() {
    this.giphySvc.searchWithObservable(
      this.form.value.searchTerm, this.form.value.resultCount
    ).subscribe(
      (result: SearchResult ) => {
        this.result = result;
        this.form.resetForm();
      },
      err => {
        console.error('error: ', err);
      },
      () => { }
    )
  }

  doSearch() {
    this.giphySvc.search(this.form.value.searchTerm, this.form.value.resultCount)
      .then(result => {
        this.result = result;
        this.form.resetForm();
      })
      .catch(err => {
        console.error('error: ', err);
      })
  }

}
