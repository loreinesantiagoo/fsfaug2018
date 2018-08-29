import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { TaskEntryComponent } from './components/task-entry.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskEntryComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule,
    MaterialModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
