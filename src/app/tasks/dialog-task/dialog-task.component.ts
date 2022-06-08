import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ifTask } from 'src/interfaces';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-dialog-task',
  templateUrl: './dialog-task.component.html',
  styleUrls: ['./dialog-task.component.scss']
})
export class DialogTaskComponent implements OnInit {
  
  oFormTask = new FormGroup({
    name: new FormControl(this.oTask?.name,[Validators.required]),
    dateStart: new FormControl(this.oTask?.dateStart,[Validators.required]),
    dateEnd: new FormControl(this.oTask?.dateEnd,[Validators.required]),
    priority: new FormControl(this.oTask?.priority,[Validators.required]),
    category: new FormControl(this.oTask?.category,[Validators.required])
  })
  bCreate:boolean;
  
  constructor(
    private taskService: TaskService,
    private dialogTask: MatDialogRef<DialogTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public oTask: ifTask) {
      this.bCreate = oTask? false:true;
     
  }

  ngOnInit(): void {}
  //Создать задачу
  // fnCreteTask() {
  //   this.oTask = this.oFormTask.value
  //   // const dialogRef = this.dialogTask.close();
  // }
  //Сохранить изменения
  fnSaveRow(){
    let oTask: ifTask =  Object.assign(this.oTask,this.oFormTask.value) 
    this.taskService.fnEditTask(oTask, this.oTask);
  }
}
