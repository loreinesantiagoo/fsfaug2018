import {NgModule} from '@angular/core';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatListModule } from '@angular/material';

const MODULES = [
  FlexLayoutModule, MatToolbarModule, MatFormFieldModule,
  MatInputModule, MatButtonModule, MatIconModule, MatListModule
];

@NgModule({
  imports: MODULES,
  exports: MODULES
})
export class MaterialModule { }
