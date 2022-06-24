import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from 'src/app/shared/interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  usersKey = 'users';
  loginKey ='me';
  login = '';
  obUsers = new BehaviorSubject<string>(this.login);
  constructor(private http:HttpClient) { }
  
  createUser(newUser: IUser):Observable<string> {
    return this.http.post<string>('user',newUser);
  }
  signIn(inputUser: IUser): Observable<boolean> {
    return this.http.post<boolean>('signIn',inputUser);
  }
  signOut():void{
    this.http.delete('signIn');
    this.login = '';
  }
  fnSetLogin(login:string):void{
    this.login = login;
  }
  checkAuth():Observable<string>{
    return this.http.get<string>('user');
  }
}
