import { NgModule } from "@angular/core";

import { FlexLayoutModule } from '@angular/flex-layout';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

const MODULES = [
    FlexLayoutModule,
    MatToolbarModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatIconModule,
    MatDatepickerModule, MatMomentDateModule
];

@NgModule({
    imports: MODULES,
    exports: MODULES
})
export class MaterialModule { }