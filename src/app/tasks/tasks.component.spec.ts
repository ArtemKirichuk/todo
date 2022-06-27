import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ITask } from '../shared/interfaces';
import { TaskService } from '../task.service';
import { UserService } from '../user.service';

import { TasksComponent } from './tasks.component';

const fakeUserService = jasmine.createSpyObj("fakeUserService", ["checkAuth"]);
const fakeTaskService = jasmine.createSpyObj("fakeTaskService", ["getTasks", "deleteTask"]);
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
describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TasksComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        RouterTestingModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,

        MatSelectModule,
        NoopAnimationsModule,
        MatTableModule,
      ],
      providers: [
        { provide: TaskService, useValue: fakeTaskService },
        { provide: UserService, useValue: fakeUserService },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {

    fixture = TestBed.createComponent(TasksComponent);

    component = fixture.componentInstance;
    fakeUserService.checkAuth.and.returnValue(of('akirichuk'));
    fakeTaskService.getTasks.and.returnValue(of([task]));
    component.selection.select(task);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('isSelect выделение задчи', () => {
    fakeTaskService.deleteTask.and.returnValue(of(true))
    expect(component.isSelect()).toBe(true);
  });
  it('deleteRow удаление задчи', () => {
    fakeTaskService.deleteTask.and.returnValue(of(true))
    component.deleteRow();
    fixture.detectChanges();
    expect(component.selection.selected.length).toBe(0)
  });
});
