import { NgModule } from "@angular/core";

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';

const MODULES = [
    MatToolbarModule, MatCardModule,
    MatFormFieldModule, MatInputModule,
    MatButtonModule, MatIconModule,
    MatRadioModule
];

@NgModule({
    imports: MODULES,
    exports: MODULES
})
export class MaterialModule { }