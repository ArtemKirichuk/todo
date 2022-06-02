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

  constructor(public taskService:TaskService,public dialogTask:MatDialog) { }
  
  ngOnInit(): void {
    
    this.taskService.obTask.subscribe((aTasks)=>{
      
      this.aTask = aTasks.slice();
      //будет ли это работать при нормальном запросе?
      this.aDisplayedColumns = Object.keys(this.aTask[0]).map((i)=>{ return i});
    })
    
  }
  fnopenDialog(){
    const dialogRef = this.dialogTask.open(DialogTaskComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    
  }
  
}
