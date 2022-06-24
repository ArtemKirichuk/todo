import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { IRegUser, IUser } from 'src/app/shared/interfaces';
import { HttpClient } from '@angular/common/http';
import { i18n } from 'src/i18n';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersKey = 'users';
  loginKey = 'me';
  login = '';
  obUsers = new BehaviorSubject<string>(this.login);
  constructor(private http: HttpClient) { }

  createUser(newUser: IRegUser): Observable<string> {
    const error = this.comparePassword(newUser);
    if(error){
      return throwError(()=>new Error(error))
    }
    return this.http.post<string>('user', newUser);
  }
  signIn(inputUser: IUser): Observable<boolean> {
    return this.http.post<boolean>('signIn', inputUser);
  }
  signOut(): void {
    this.http.delete('signIn');
    this.login = '';
  }
  fnSetLogin(login: string): void {
    this.login = login;
  }
  checkAuth(): Observable<string> {
    return this.http.get<string>('user');
  }
  comparePassword(user: IRegUser): string {
    return user.password !== user.passwordRepeat ? i18n.DEFF_PASS : '';
  }
}
