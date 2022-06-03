import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ifTask } from 'interfaces';
import { TaskService } from '../task.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogTaskComponent } from './dialog-task/dialog-task.component';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {LiveAnnouncer} from '@angular/cdk/a11y';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, AfterViewInit  {
  
  aTask: ifTask[] = [];
  @ViewChild(MatSort) sort!: MatSort;
  aData:MatTableDataSource<ifTask>;

  aDisplayedColumns: string[] = []
  selection = new SelectionModel<ifTask>(false, []);
  // @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public taskService: TaskService,
    public dialogTask: MatDialog) { 
      this.aData = new MatTableDataSource(taskService.fnGetTasks());
    }

  ngOnInit(): void {
    this.taskService.obTask.subscribe((aTasks) => {
      this.aData = new MatTableDataSource(aTasks);
      this.aTask = aTasks.slice();
      //будет ли это работать при нормальном запросе?
      this.aDisplayedColumns = Object.keys(this.aTask[0]).map((i) => { return i }).concat(['select']);
    })
  }

  ngAfterViewInit() {
    this.aData.sort = this.sort;
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
    if (!this.isSelect()) return
    let oTask = this.selection.selected[0];

    this.selection.clear();
    this.taskService.fnDeleteTask(oTask);
  }
  //редактирование задачи
  fnEditRow() {
    if (!this.isSelect()) return
    const dialogRef = this.dialogTask.open(DialogTaskComponent, { data: this.selection.selected[0] });
  }
  //Проверка
  isSelect(): boolean {

    let oTask = this.selection.selected[0];
    let isSelect = oTask ? true : false;
    if (!isSelect) {
      window.alert('Выберите задачу.')
    }
    return isSelect
  }
}
