
import { ComponentFixture, flushMicrotasks, TestBed } from '@angular/core/testing';
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
import { UserService } from '../user.service';
import { of } from 'rxjs';
import { TasksComponent } from '../tasks/tasks.component';
import { By } from '@angular/platform-browser';
describe('StartpageComponent', () => {
  let component: StartpageComponent;
  let fixture: ComponentFixture<StartpageComponent>;
  RouterTestingModule
  const fakeUserService = jasmine.createSpyObj("fakeUserService", ["signIn","fnSetLogin"]);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StartpageComponent],
      providers: [
        { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
        { provide: UserService , useValue: fakeUserService }
      ],
      schemas:[ CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        MatSnackBarModule,
        RouterTestingModule.withRoutes([
          { path: 'task', component: TasksComponent }
      ]),
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
  it('Заполнение формы аутентификации', () => {
    component.formSignIn.setValue({login:'akirichuk', password:'testPass'})
    const inputLogin = fixture.debugElement.query(By.css('#login'));
    const inputRegPassword = fixture.debugElement.query(By.css('#passwordReg'));
    expect(inputLogin.nativeElement.value ).toBe('akirichuk');
    expect(inputRegPassword.nativeElement.value ).toBe('testPass');

  });
  it('signIn: проверка может ли пользователь войти в систему', done => {
    fakeUserService.signIn.and.returnValue(of(true));
    component.signIn()
    expect(component.auth).toBe(true);
    done();
  });
  it('Переход на форму регистрации', () => {
    const btnRegistration = fixture.debugElement.query(By.css('#toRegistrationUser'));
    btnRegistration.nativeElement.click()
    expect(component.isRegistration ).toBeTrue();
    
  });
  it('Заполнение формы регистрации', () => {
    //заполнение формы в компоненте
    component.formUser.setValue({login:'akirichuk', password:'testPass', passwordRepeat:'testPass'})
    //переход на форму регистрации
    const btnRegistration = fixture.debugElement.query(By.css('#toRegistrationUser'));
    btnRegistration.nativeElement.click()
    fixture.detectChanges()
    //вытаскиваем поля формы с шаблона
    const inputLogin = fixture.debugElement.query(By.css('#login'));
    const inputRegPassword = fixture.debugElement.query(By.css('#password'));
    const inputRegPasswordRepeat = fixture.debugElement.query(By.css('#passwordRepeat'));
    //ожидания
    expect(inputLogin.nativeElement.value ).toBe('akirichuk');
    expect(inputRegPassword.nativeElement.value ).toBe('testPass');
    expect(inputRegPasswordRepeat.nativeElement.value ).toBe('testPass');

  });
});
