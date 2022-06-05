import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { ifTask } from 'src/interfaces'; 

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
    this.aTasks.push(oTask);
    localStorage.setItem(this.sTaskKey, JSON.stringify(this.aTasks));
    this.obTask.next(this.aTasks);
  }
  fnDeleteTask(oTask:ifTask){

    this.aTasks.splice(this.aTasks.indexOf(oTask),1);
    this.aTasks = this.aTasks.slice();
    this.obTask.next(this.aTasks);
    localStorage.setItem(this.sTaskKey, JSON.stringify(this.aTasks));
  }
  fnEditTask(oNewTask:ifTask,oOldTask:ifTask){
    
    let nIndex = this.aTasks.indexOf(oOldTask)
    this.aTasks.splice(nIndex,1,oNewTask);
    this.obTask.next(this.aTasks);
    localStorage.setItem(this.sTaskKey, JSON.stringify(this.aTasks));
  }
  fnGetTasks(){
    return this.aTasks;
  }
  
}
// localStorage.clear()
// localStorage.removeItem("Ключ")
//let sUsrs = <string>localStorage.getItem('users');
//let oUser = this.oFormSignIn.value;
