import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { StartpageComponent } from './startpage/startpage.component';
import { TasksComponent } from './tasks/tasks.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { DialogTaskComponent } from './tasks/dialog-task/dialog-task.component';
import {  MAT_DATE_LOCALE } from '@angular/material/core';
@NgModule({
  declarations: [
    AppComponent,
    StartpageComponent,
    TasksComponent,
    DialogTaskComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    
    RouterModule.forRoot([
      { path: '', component: StartpageComponent },
      { path: 'task', component: TasksComponent },
    ]),
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    {
      provide: MAT_DATE_LOCALE, useValue: 'ru'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
