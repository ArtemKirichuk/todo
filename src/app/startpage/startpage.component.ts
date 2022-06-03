import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ifUser } from 'interfaces';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.scss']
})
export class StartpageComponent implements OnInit {
  oFormAddUsr = new FormGroup({
    login: new FormControl(''),
    password: new FormControl(''),
    passwordRepeat: new FormControl('')
  })
  oFormSignIn = new FormGroup({
    login: new FormControl(''),
    password: new FormControl('')
  })
  aUser: ifUser[] = [];


  bRegistration: boolean = false;
  constructor(
    
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  fnSignIn() {
    // localStorage.clear()
    // localStorage.removeItem("Ключ")
    let sUsrs = <string>localStorage.getItem('users');
    let aUser: ifUser[] = [];
    let oUser = this.oFormSignIn.value;
    //проверяем существование localstore пользователей
    if (sUsrs) {
      aUser = JSON.parse(sUsrs);
      let bExistUser = aUser.some(e => e.login == oUser.login && e.password == oUser.password);
      if (bExistUser) {
        this.router.navigateByUrl('task');
      } else window.alert('Неверный логин или пароль!');
    }

  }
  fnAddUsr() {
    let sUsrs = <string>localStorage.getItem('users');
    let aUser: ifUser[] = [];
    let oNewUser = this.oFormAddUsr.value;
    //Проверка пароль и повторный пароль
    if (oNewUser.password !== oNewUser.passwordRepeat) {
      window.alert('Пароль отличается');
      return
    }
    //Если localstore пользователей уже существует
    if (sUsrs) {
      aUser = JSON.parse(sUsrs);
      let bExistUser = aUser.some(e => e.login == oNewUser.login);
      if (bExistUser) {
        console.log('Данный пользователь уже существует. Пароль обнавлён');
      }
    }
    //добавляем пользователя
    aUser.push({ login: oNewUser.login, password: oNewUser.password })
    localStorage.setItem('users', JSON.stringify(aUser));
    //выходим с регистрации
    this.bRegistration = !this.bRegistration;
    this.oFormAddUsr.reset()
    //Успешная регистрация
    window.alert(`Пользователь ${oNewUser.login} зарегистрирован.`);
  }

}
