import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartpageRoutingModule } from './startpage-routing.module';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { StartpageComponent } from './startpage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
@NgModule({
  declarations: [StartpageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StartpageRoutingModule,
    //MATERIAL
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  providers:[{ provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },]


})
export class StartpageModule { }
