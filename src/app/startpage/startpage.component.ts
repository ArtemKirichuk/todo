import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ifUser } from 'interfaces';
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
  constructor() { }

  ngOnInit(): void {
  }
  fnSignIn() {

  }
  fnAddUsr() {

    let sUsrs = <string>localStorage.getItem('users');
    let aUser: ifUser[] = [];
    let oNewUser = this.oFormAddUsr.value;
    //Если стор уже создан
    if (sUsrs) {
      aUser = JSON.parse(sUsrs);
      let bExistUsr = aUser.some(e => e.login == oNewUser.login);
      if (bExistUsr) {
        console.log('Данный пользователь уже существует.')
        return
      }
    }
    //добавляем пользователя
    aUser.push({ login: oNewUser.login, password: oNewUser.password })
    localStorage.setItem('users', JSON.stringify(aUser)); 
    //выходим с регистрации
    this.bRegistration = !this.bRegistration;
    this.oFormAddUsr.reset()
  }

}
