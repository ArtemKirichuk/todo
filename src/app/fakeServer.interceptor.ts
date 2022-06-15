import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ifTask, ifUser } from './shared/interfaces';
import { i18n } from 'src/i18n';
import { ThisReceiver } from '@angular/compiler';

@Injectable()
export class MainInterceptor implements HttpInterceptor {
    usersKey = 'users';
    loginKey = 'me';
    sUsers: string = <string>localStorage.getItem(this.usersKey);
    aUser: ifUser[] = this.sUsers ? JSON.parse(this.sUsers) : [];
    sTaskKey = 'tasks/';
    sLogin: string | null = null;
    sKeyUserTask = '';
    aTasks: ifTask[] = [];
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(request.method + ' ' + request.url);
        // SIGIN USER
        if (request.method === "POST" && request.url === "signIn") {
            return of(new HttpResponse({ status: 200, body: this.fnSignIn(request.body) }));
        }
        // SIGNOUT USER
        if (request.method === "DELETE" && request.url === "signIn") {
            this.fnSignOut()
            return of(new HttpResponse({ status: 200, body: true }));
        }
        // CHECK AUTH
        if (request.method === "GET" && request.url === "user") {
            return of(new HttpResponse({ status: 200, body: this.fnCheckAuth() }));
        }
        // CREATE USER
        if (request.method === "POST" && request.url === "user") {
            return of(new HttpResponse({ status: 200, body: this.fnCreateUser(request.body) }));
        }
        // GET TASK
        if (request.method === "GET" && request.url === "tasks") {
            return of(new HttpResponse({ status: 200, body: this.fnGetTasks() }));
        }
        // CREATE TASK
        if (request.method === "POST" && request.url === "tasks") {
            this.fnCreateTask(request.body)
            return of(new HttpResponse({ status: 200, body: true }));
        }
        // DELETE TASK
        if (request.method === "DELETE" && request.url === "tasks") {

            this.fnDeleteTask(JSON.parse(request.params.get('id')!))
            return of(new HttpResponse({ status: 200, body: true }));
        }
        // EDIT TASK
        if (request.method === "PUT" && request.url === "tasks") {
            this.fnEditTask( request.body)
            return of(new HttpResponse({ status: 200, body: true }));
        }
        
        return next.handle(request.clone());
    }
    fnEditTask( oTask: ifTask) {
        let aTasks = this.fnGetTasks();
        let oOldTask = aTasks.find(e=>e.id == oTask.id)
        if(!oOldTask){
            return
        }
        aTasks.splice(aTasks.indexOf(oOldTask!), 1, oTask);
        
        localStorage.setItem(this.sKeyUserTask, JSON.stringify(this.aTasks));
    }
    fnDeleteTask(id: number) {
        let aTasks = this.fnGetTasks();
        let oTask = aTasks.find(e => e.id == id)
        if (!oTask) {
            return
        }
        aTasks.splice(aTasks.indexOf(oTask!), 1);
        // this.aTasks = this.aTasks.slice();
        // this.obTask.next(this.aTasks);
        localStorage.setItem(this.sKeyUserTask, JSON.stringify(aTasks));
    }
    fnGetTasks() {
        let sTasks = <string>localStorage.getItem(this.sKeyUserTask);
        this.aTasks = sTasks ? JSON.parse(sTasks) : [];
        return this.aTasks
    }
    fnCreateTask(oTask: ifTask) {
        let aTask = this.fnGetTasks()
        oTask.creator = this.sLogin!
        oTask.id = Date.now();
        aTask.push(oTask);
        localStorage.setItem(this.sKeyUserTask, JSON.stringify(aTask));
    }
    fnSignIn(oInputUser: ifUser): boolean {

        let bExistUser: boolean;
        //проверяем существование localstore пользователей
        bExistUser = this.aUser.some(e => e.login == oInputUser.login && e.password == oInputUser.password);
        if (bExistUser) {
            this.sLogin = oInputUser.login
            this.sKeyUserTask = this.sTaskKey + this.sLogin
            localStorage.setItem(this.loginKey, oInputUser.login);
        } else {
            this.sKeyUserTask = '';
            this.sLogin = null
        }
        return bExistUser
    }
    fnSignOut() {
        this.sKeyUserTask = '';
        this.sLogin = null;
        //бесполезная строчка
        localStorage.removeItem(this.loginKey);
    }
    fnCheckAuth(): string {

        this.sLogin = <string>localStorage.getItem(this.loginKey);
        this.sKeyUserTask = this.sTaskKey + this.sLogin
        return this.sLogin
    }
    fnCreateUser(oNewUser: ifUser): string {
        let bExistUser = this.aUser.some(e => e.login == oNewUser.login);

        //добавляем пользователя
        this.aUser.push({ login: oNewUser.login, password: oNewUser.password })
        localStorage.setItem(this.usersKey, JSON.stringify(this.aUser));
        return bExistUser ? i18n.USER_EXIST_UP_PASS : i18n.USER_REGISTERED(oNewUser.login)
    }

}