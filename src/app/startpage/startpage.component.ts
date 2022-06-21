import {Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { i18n } from 'src/i18n';
import { UserService } from '../user.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StartpageComponent implements OnInit {
  formUser = new FormGroup({
    login: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    passwordRepeat: new FormControl(null, [Validators.required])
  })
  formSignIn = new FormGroup({
    login: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),

  })
  usersKey = 'users';
  isRegistration: boolean = false;
  destroy$ = new Subject<void>()
  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,
    private userService: UserService
  ) {  }

  ngOnInit(): void { }

  signIn():void {
    let oInputUser = this.formSignIn.value;
    //проверяем существование localstore пользователей
    this.userService.signIn(oInputUser)
    .pipe(takeUntil(this.destroy$))
    .subscribe((bAuth: boolean) => {
      if (bAuth) {
        this.userService.fnSetLogin(oInputUser.login);
        this.router.navigateByUrl('task');
      } else this._snackBar.open(i18n.USER_NOT_EXIST);
    })
  }
  addUser():void {
    let newUser = this.formUser.value;
    //Проверка пароль и повторный пароль это скорее всего можно запихнуть в валидацию
    if (newUser.password !== newUser.passwordRepeat) {
      this._snackBar.open(i18n.USER_EXIST_UP_PASS);
      return
    }
    this.userService.createUser(newUser)
    .pipe(takeUntil(this.destroy$))
    .subscribe((e) => {
      let msg = e;
      this._snackBar.open(msg);
      //выходим с регистрации
      this.isRegistration = !this.isRegistration;
      this.formUser.reset();
    })
  }
  ngOnDestroy(): void {
    this.destroy$.next()
  }
}
