import { Component, OnInit } from '@angular/core';
import { ifTask } from 'interfaces';
import { TaskService } from '../task.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogTaskComponent } from './dialog-task/dialog-task.component';
import { SelectionModel } from '@angular/cdk/collections';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  bLoad = true
  aTask: ifTask[] = []
  aDisplayedColumns: string[] = []
  selection = new SelectionModel<ifTask>(false, []);
  constructor(public taskService: TaskService, public dialogTask: MatDialog) { }

  ngOnInit(): void {

    this.taskService.obTask.subscribe((aTasks) => {
      this.aTask = aTasks.slice();
      //будет ли это работать при нормальном запросе?
      this.aDisplayedColumns = Object.keys(this.aTask[0]).map((i) => { return i }).concat(['select']);
    })

  }
  //Добавление задачи
  fnopenDialog() {
    const dialogRef = this.dialogTask.open(DialogTaskComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  //Удаление задачи ,row: ifTask
  fnDeleteRow(event: MouseEvent) {
    let oTask = this.selection.selected[0];
    this.taskService.fnDeleteTask(oTask);    
  }
}
