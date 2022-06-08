import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { ifTask } from 'src/interfaces';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})

export class TaskService implements OnInit {
  obTask!: BehaviorSubject<ifTask[]>;
  sTaskKey = 'tasks/';
  sTaskUserKey!:string;
  aTasks: ifTask[] = [];
  constructor(private userService: UserService) {
    this.userService.obUsers.subscribe((sLogin) => {
      this.sTaskUserKey = this.sTaskKey +sLogin
      let sTasks = <string>localStorage.getItem(this.sTaskUserKey);
      this.aTasks = sTasks ? JSON.parse(sTasks) : [];
      this.obTask = new BehaviorSubject<ifTask[]>(this.aTasks)
    })

  }
  ngOnInit(): void { }
  fnCreateTask(oTask: ifTask) {
    oTask.creator = this.userService.sLogin
    this.aTasks.push(oTask);
    localStorage.setItem(this.sTaskUserKey, JSON.stringify(this.aTasks));
    this.obTask.next(this.aTasks);
  }
  fnDeleteTask(oTask: ifTask) {
    this.aTasks.splice(this.aTasks.indexOf(oTask), 1);
    this.aTasks = this.aTasks.slice();
    this.obTask.next(this.aTasks);
    localStorage.setItem(this.sTaskUserKey, JSON.stringify(this.aTasks));
  }
  fnEditTask(oNewTask: ifTask, oOldTask: ifTask) {
    // oTask.creator = this.userService.sLogin
    let nIndex = this.aTasks.indexOf(oOldTask)
    this.aTasks.splice(nIndex, 1, oNewTask);
    this.obTask.next(this.aTasks);
    localStorage.setItem(this.sTaskUserKey, JSON.stringify(this.aTasks));
  }
  fnGetTasks() {
    return this.aTasks;
  }

}
// localStorage.clear()
// localStorage.removeItem("Ключ")
//let sUsrs = <string>localStorage.getItem('users');
//let oUser = this.oFormSignIn.value;
