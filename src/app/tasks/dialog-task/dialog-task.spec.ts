import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ITask } from 'src/app/shared/interfaces';
import { TaskService } from 'src/app/task.service';
import { DialogTaskComponent } from './dialog-task.component';

const fakeTaskService = jasmine.createSpyObj("fakeTaskService", ["getTasks", "deleteTask"]);

describe('DialogTaskComponent', () => {
  let component: DialogTaskComponent;
  let fixture: ComponentFixture<DialogTaskComponent>;
  const task: ITask = {
    name: 'Name',
    category: 'category',
    complete: false,
    creator: 'akirichuk',
    dateEnd: new Date(),
    dateStart: new Date(),
    id: new Date().getTime(),
    priority: 1
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogTaskComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,

        //material
        MatDatepickerModule,
        MatNativeDateModule,
        MatDialogModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatAutocompleteModule,
        MatSelectModule,
        NoopAnimationsModule,
        MatTableModule,
        MatCheckboxModule
      ],
      providers: [
        { provide: TaskService, useValue: fakeTaskService },
        { provide: MAT_DIALOG_DATA, useValue: task },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {

    fixture = TestBed.createComponent(DialogTaskComponent);

    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('compareCompleteDate сравнение дат', () => {
    const date = new Date(new Date().getTime() + 24*3600*1000) 
    expect(component.compareCompleteDate(date)).toBeTrue();
  });
});
