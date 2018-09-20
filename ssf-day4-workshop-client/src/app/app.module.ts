import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { EntryComponent } from './components/entry.component';
import { ListComponent } from './components/list.component';
import {CartService} from './cart.service';

@NgModule({
  declarations: [
    AppComponent,
    EntryComponent,
    ListComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule,
    FormsModule, HttpClientModule,
    MaterialModule
  ],
  providers: [ CartService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
