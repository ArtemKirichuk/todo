import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { StartpageComponent } from './startpage/startpage.component';
import { TasksComponent } from './tasks/tasks.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { DialogTaskComponent } from './tasks/dialog-task/dialog-task.component';
import {  MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { DilogDeleteTaskComponent } from './tasks/dilog-delete-task/dilog-delete-task.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
 
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MainInterceptor } from './fakeServer.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    StartpageComponent,
    TasksComponent,
    DialogTaskComponent,
    DilogDeleteTaskComponent,
    
  ],
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: StartpageComponent },
      { path: 'task', component: TasksComponent },
    ]),
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'ru'},
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}},
    {provide: HTTP_INTERCEPTORS, useClass: MainInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
