import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { ifTask } from 'interfaces'; 
@Injectable({
  providedIn: 'root'
})

export class TaskService implements OnInit{
  obTask!:BehaviorSubject<ifTask[]>;
  sTaskKey = 'tasks'
  aTasks:ifTask[] = [] 
  constructor() { 
    let sTasks = <string>localStorage.getItem(this.sTaskKey);
    this.aTasks = sTasks? JSON.parse(sTasks):[];
    this.obTask= new BehaviorSubject<ifTask[]>(this.aTasks)
  }
  ngOnInit(): void {}
  fnCreateTask(oTask:ifTask){
    debugger
    this.aTasks.push(oTask);
    localStorage.setItem(this.sTaskKey, JSON.stringify(this.aTasks));
    this.obTask.next(this.aTasks);
  }
  fnGetTasks(){
    return this.aTasks;
  }
  
}
// localStorage.clear()
// localStorage.removeItem("Ключ")
//let sUsrs = <string>localStorage.getItem('users');
//let oUser = this.oFormSignIn.value;
