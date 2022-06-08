import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ifUser } from 'src/interfaces';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { i18n } from 'src/i18n'; 
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.scss']
})
export class StartpageComponent implements OnInit {
  oFormAddUsr = new FormGroup({
    login: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
    passwordRepeat: new FormControl('',[Validators.required])
  })
  oFormSignIn = new FormGroup({
    login: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required])
  })
  aUser: ifUser[] = [];
  usersKey = 'users';

  bRegistration: boolean = false;
  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,
    private auth:AuthService
  ) { }

  ngOnInit(): void {
  }
  fnSignIn() {
    // this.auth.getUser();
    let sUsrs = <string>localStorage.getItem(this.usersKey);

    let aUser: ifUser[] = [];
    let oUser = this.oFormSignIn.value;
    //проверяем существование localstore пользователей
    if (sUsrs) {
      aUser = JSON.parse(sUsrs);
      let bExistUser = aUser.some(e => e.login == oUser.login && e.password == oUser.password);
      if (bExistUser) {
        this.router.navigateByUrl('task');
      } else  this._snackBar.open(i18n.BAD_AUTH); 
    } else this._snackBar.open(i18n.USER_NOT_EXIST); 

  }
  fnAddUsr() {
    let sUsrs = <string>localStorage.getItem(this.usersKey);
    let aUser: ifUser[] = [];
    let oNewUser = this.oFormAddUsr.value;
    //Проверка пароль и повторный пароль
    if (oNewUser.password !== oNewUser.passwordRepeat) {
      this._snackBar.open(i18n.USER_EXIST_UP_PASS);
      return
    }
    //Если localstore пользователей уже существует
    if (sUsrs) {
      aUser = JSON.parse(sUsrs);
      let bExistUser = aUser.some(e => e.login == oNewUser.login);
      if (bExistUser) {
        this._snackBar.open(i18n.USER_EXIST_UP_PASS);
      }
    }
    //добавляем пользователя
    aUser.push({ login: oNewUser.login, password: oNewUser.password })
    localStorage.setItem('users', JSON.stringify(aUser));
    //выходим с регистрации
    this.bRegistration = !this.bRegistration;
    this.oFormAddUsr.reset()
    //Успешная регистрация
    this._snackBar.open(i18n.USER_REGISTERED(oNewUser.login));
  }

}
