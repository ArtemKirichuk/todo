import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MainInterceptor } from './fakeServer.interceptor';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'ru' },
    
    { provide: HTTP_INTERCEPTORS, useClass: MainInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
