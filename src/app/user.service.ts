import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { i18n } from 'src/i18n';
import { ifUser } from 'src/app/shared/interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  usersKey = 'users';
  loginKey ='me';
  sLogin = ''
  // sLogin:string = <string>localStorage.getItem(this.loginKey);
  obUsers = new BehaviorSubject<string>(this.sLogin)
  constructor(private http:HttpClient) { }
  
  createUser(oNewUser: ifUser):Observable<string> {
    return this.http.post<string>('user',oNewUser)
    // 
  }
  fnSignIn(oInputUser: ifUser): Observable<boolean> {
    return this.http.post<boolean>('signIn',oInputUser)
  }
  fnSignOut(){
    this.http.delete('signIn')
    this.sLogin = ''
  }
  fnSetLogin(login:string){
    this.sLogin = login;
  }
  fnCheckAuth():Observable<string>{
    return this.http.get<string>('user')
  }
}
