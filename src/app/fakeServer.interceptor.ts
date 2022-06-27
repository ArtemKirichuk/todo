import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { IRegUser, ITask, IUser } from './shared/interfaces';
import { i18n } from 'src/i18n';

@Injectable()
export class MainInterceptor implements HttpInterceptor {
    usersKey = 'users';
    loginKey = 'me';
    stringUsers: string = <string>localStorage.getItem(this.usersKey);
    users: IUser[] = this.stringUsers ? JSON.parse(this.stringUsers) : [];
    taskKey = 'tasks/';
    login: string | null = null;
    keyUserTask = '';
    tasks: ITask[] = [];
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(request.method + ' ' + request.url);
        // SIGIN USER
        if (request.method === "POST" && request.url === "signIn") {
            return of(new HttpResponse({ status: 200, body: this.signIn(request.body) }));
        }
        // SIGNOUT USER
        if (request.method === "DELETE" && request.url === "signIn") {
            this.signOut()
            return of(new HttpResponse({ status: 200, body: true }));
        }
        // CHECK AUTH
        if (request.method === "GET" && request.url === "user") {
            return of(new HttpResponse({ status: 200, body: this.checkAuth() }));
        }
        // CREATE USER
        if (request.method === "POST" && request.url === "user") {
            return of(new HttpResponse({ status: 200, body: this.createUser(request.body) }));
        }
        // GET TASK
        if (request.method === "GET" && request.url === "tasks") {
            return of(new HttpResponse({ status: 200, body: this.getTasks() }));
        }
        // CREATE TASK
        if (request.method === "POST" && request.url === "tasks") {
            this.createTask(request.body)
            return of(new HttpResponse({ status: 200, body: true }));
        }
        // DELETE TASK
        if (request.method === "DELETE" && request.url === "tasks") {

            this.deleteTask(JSON.parse(request.params.get('id')!))
            return of(new HttpResponse({ status: 200, body: true }));
        }
        // EDIT TASK
        if (request.method === "PUT" && request.url === "tasks") {
            this.editTask(request.body)
            return of(new HttpResponse({ status: 200, body: true }));
        }
        return next.handle(request.clone());
    }
    editTask(task: ITask): void {
        let tasks = this.getTasks();
        let oOldTask = tasks.find(e => e.id == task.id);
        if (!oOldTask) {
            return;
        }
        tasks.splice(tasks.indexOf(oOldTask!), 1, task);

        localStorage.setItem(this.keyUserTask, JSON.stringify(this.tasks));
    }
    deleteTask(id: number): void {
        let tasks = this.getTasks();
        let task = tasks.find(e => e.id == id);
        if (!task) {
            return;
        }
        tasks.splice(tasks.indexOf(task!), 1);
        localStorage.setItem(this.keyUserTask, JSON.stringify(tasks));
    }
    getTasks(): ITask[] {
        let sTasks = <string>localStorage.getItem(this.keyUserTask);
        this.tasks = sTasks ? JSON.parse(sTasks) : [];
        return this.tasks;
    }
    createTask(task: ITask): void {
        let aTask = this.getTasks();
        task.creator = this.login!;
        task.id = Date.now();
        aTask.push(task);
        localStorage.setItem(this.keyUserTask, JSON.stringify(aTask));
    }
    signIn(inputUser: IUser): boolean {
        let bExistUser: boolean;
        //проверяем существование localstore пользователей
        bExistUser = this.users.some(e => e.login == inputUser.login && e.password == inputUser.password);
        if (bExistUser) {
            this.login = inputUser.login;
            this.keyUserTask = this.taskKey + this.login;
            localStorage.setItem(this.loginKey, inputUser.login);
        } else {
            this.keyUserTask = '';
            this.login = null;
        }
        return bExistUser;
    }
    signOut() {
        this.keyUserTask = '';
        this.login = null;
        //бесполезная строчка
        localStorage.removeItem(this.loginKey);
    }
    checkAuth(): string {
        this.login = <string>localStorage.getItem(this.loginKey);
        this.keyUserTask = this.taskKey + this.login;
        return this.login;
    }
    createUser(newUser: IRegUser): string {
        let bExistUser = this.users.some(e => e.login == newUser.login);

        //добавляем пользователя
        this.users.push({ login: newUser.login, password: newUser.password });
        localStorage.setItem(this.usersKey, JSON.stringify(this.users));
        return bExistUser ? i18n.USER_EXIST_UP_PASS : i18n.USER_REGISTERED(newUser.login);

    }

}