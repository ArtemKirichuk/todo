import { Component, OnInit } from '@angular/core';
import { ifTask } from 'interfaces';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  bLoad = true
  aTask:ifTask[] =[]
  aDisplayedColumns:string[] = []

  constructor(taskService:TaskService) { }
  
  ngOnInit(): void {
    
    let sTasks = <string>localStorage.getItem('tasks');
    if(!sTasks){
      window.alert('Задач нет!');
      return
    }
    this.aDisplayedColumns = Object.keys(this.aTask[0]).map((i)=>{ return i});
    this.aTask = JSON.parse(sTasks);  
    
  }

}
