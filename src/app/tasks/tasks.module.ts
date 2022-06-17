import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksRoutingModule } from './tasks-routing.module';

import { MatTableModule, } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { TasksComponent } from './tasks.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogTaskComponent } from './dialog-task/dialog-task.component';
import { DilogDeleteTaskComponent } from './dilog-delete-task/dilog-delete-task.component';
import { TablePipe } from '..//pipes.pipe';
@NgModule({
  declarations: [ 
    TasksComponent,
    DialogTaskComponent,
    DilogDeleteTaskComponent,
    TablePipe
   ],
  imports: [
    TasksRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    //material
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSortModule,
    MatSnackBarModule,
    MatCardModule,
    MatSelectModule,
    MatAutocompleteModule
  ]
})
export class TasksModule { }
