
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

import { StartpageComponent } from './startpage.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
describe('StartpageComponent', () => {
  let component: StartpageComponent;
  let fixture: ComponentFixture<StartpageComponent>;

  const fakeUserService = jasmine.createSpyObj("fakeUserService", ["start"]);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StartpageComponent],
      providers: [
        { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
      ],
      schemas:[ CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        MatSnackBarModule,
        RouterTestingModule,
        HttpClientTestingModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        NoopAnimationsModule, 
        FormsModule,
        ReactiveFormsModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
