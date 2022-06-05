import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
    name: new FormControl(this.oTask?.name),
    dateStart: new FormControl(this.oTask?.dateStart),
    dateEnd: new FormControl(this.oTask?.dateEnd),
    priority: new FormControl(this.oTask?.priority),
    category: new FormControl(this.oTask?.category)
  })
  bCreate:boolean;
  constructor(
    public taskService: TaskService,
    private dialogTask: MatDialogRef<DialogTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public oTask: ifTask) {
      this.bCreate = oTask? false:true;
  }

  ngOnInit(): void {}
  //Создать задачу
  fnCreteTask() {
    // oFormTask.
    let oTask: ifTask = this.oFormTask.value;
    this.taskService.fnCreateTask(oTask);
    const dialogRef = this.dialogTask.close();
  }
  //Сохранить изменения
  fnSaveRow(){
    let oTask: ifTask = this.oFormTask.value;
    this.taskService.fnEditTask(oTask, this.oTask);
  }
}
