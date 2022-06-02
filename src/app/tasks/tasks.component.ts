import { Component, OnInit } from '@angular/core';
import { ifTask } from 'interfaces';
import { TaskService } from '../task.service';
import {MatDialog} from '@angular/material/dialog';
import { DialogTaskComponent } from './dialog-task/dialog-task.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  bLoad = true
  aTask:ifTask[] =[]
  aDisplayedColumns:string[] = []

  constructor(taskService:TaskService,public dialogTask:MatDialog) { }
  
  ngOnInit(): void {
    
    let sTasks = <string>localStorage.getItem('tasks');
    if(!sTasks){
      // window.alert('Задач нет!');
      return
    }
    this.aDisplayedColumns = Object.keys(this.aTask[0]).map((i)=>{ return i});
    this.aTask = JSON.parse(sTasks);  
  }
  fnopenDialog(){
    const dialogRef = this.dialogTask.open(DialogTaskComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    
  }
  
}
