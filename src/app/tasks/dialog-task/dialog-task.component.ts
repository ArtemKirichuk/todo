import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ifTask } from 'interfaces';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-dialog-task',
  templateUrl: './dialog-task.component.html',
  styleUrls: ['./dialog-task.component.scss']
})
export class DialogTaskComponent implements OnInit {
  oFormTask = new FormGroup({
    name: new FormControl(''),
    dateStart: new FormControl(new Date()),
    dateEnd: new FormControl(new Date()),
    priority: new FormControl(''),
    category: new FormControl('')
  })

  constructor(public taskService:TaskService,private dialogTask:MatDialogRef<DialogTaskComponent>) { 
    
  }

  ngOnInit(): void {
  }
  fnCreteTask(){
    // oFormTask.
    let oTask:ifTask = this.oFormTask.value;
    this.taskService.fnCreateTask(oTask);
    const dialogRef = this.dialogTask.close();
  }
}
