import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { i18n } from 'src/i18n';
import { ifUser } from 'src/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  usersKey = 'users';
  loginKey ='me';
  sUsers:string = <string>localStorage.getItem(this.usersKey);
  aUser: ifUser[] = this.sUsers? JSON.parse(this.sUsers):[];
  sLogin:string = <string>localStorage.getItem(this.loginKey);
  obUsers = new BehaviorSubject<string>(this.sLogin)
  constructor() {
    // this.sUsers= <string>localStorage.getItem(this.usersKey);
    // this.aUser = this.sUsers? JSON.parse(this.sUsers):[];
    // this.sLogin = <string>localStorage.getItem(this.loginKey);
    // this.obUsers.next(this.sLogin)
  }
  
  getUsers() {
    return this.aUser
  }
  setUser(oNewUser: ifUser) {

    let bExistUser = this.aUser.some(e => e.login == oNewUser.login);

    //добавляем пользователя
    this.aUser.push({ login: oNewUser.login, password: oNewUser.password })
    localStorage.setItem(this.usersKey, JSON.stringify(this.aUser));

    return bExistUser ? i18n.USER_EXIST_UP_PASS : i18n.USER_REGISTERED(oNewUser.login)
  }
  fnSignIn(oInputUser: ifUser): boolean {
    let bExistUser = false;
    //проверяем существование localstore пользователей
    bExistUser = this.aUser.some(e => e.login == oInputUser.login && e.password == oInputUser.password);
    this.sLogin =  bExistUser ? oInputUser.login : '';
    //сохраняем залогиненого пользователя
    localStorage.setItem(this.loginKey, this.sLogin);
    this.obUsers.next(this.sLogin)
    return bExistUser
  }
  fnSignOut(){
    this.sLogin = '';
    localStorage.removeItem(this.sLogin);
  }
}
