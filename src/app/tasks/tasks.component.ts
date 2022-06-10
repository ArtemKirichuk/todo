import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ifTask ,ifFilter} from 'src/app/shared/interfaces';
import { TaskService } from '../task.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogTaskComponent } from './dialog-task/dialog-task.component';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSnackBar } from '@angular/material/snack-bar';
import { i18n } from 'src/i18n';
import { DilogDeleteTaskComponent } from './dilog-delete-task/dilog-delete-task.component';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { aPriority, COLOR } from '../shared/data';
import { createFilter } from '../shared/helper';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
 

export class TasksComponent implements OnInit,AfterViewInit {
  aPriority = aPriority
  @ViewChild(MatSort) sort!: MatSort;
  aData: MatTableDataSource<ifTask>;
  COLOR = COLOR
  aDisplayedColumns: string[] = []
  selection = new SelectionModel<ifTask>(false, []);
  aCategory: string[] = []
  oFilterValues: ifFilter={}
  bComplete:boolean=false;
  constructor(
    private taskService: TaskService,
    public userService: UserService,
    private dialogTask: MatDialog,
    private router: Router,
    private _snackBar: MatSnackBar) {
    this.aData = new MatTableDataSource(taskService.fnGetTasks());
  }

  ngOnInit(): void {
    //авторизация
    if (!this.userService.sLogin) {
      this._snackBar.open(i18n.BAD_AUTH)
      this.router.navigateByUrl('');
      return
    }
    //подписка на получение задачи
    this.taskService.obTask.subscribe((aTasks) => {
      this.aData = new MatTableDataSource(aTasks);
      this.aData.filterPredicate = createFilter();
      //категории
      
      this.aCategory = this.taskService.aCategory.slice()
      //фильтры
      this.oFilterValues['complete'] = this.bComplete
      this.aData.filter = JSON.stringify(this.oFilterValues)
      //сортировка
      this.aData.sort = this.sort;
      //Колонки
      this.aDisplayedColumns = ['select', 'name', 'dateStart', 'dateEnd', 'priority', 'category', 'creator'];
    })
  }
  fnComplete(){
    // this.bNotComplete
    this.oFilterValues['complete'] = this.bComplete
    this.aData.filter = JSON.stringify(this.oFilterValues)
  }
  // Фильтр
  filterChange(value: string) {
    this.oFilterValues['category']= value ;
    this.aData.filter = JSON.stringify(this.oFilterValues)
  }

  ngAfterViewInit() {
    this.aData.sort = this.sort;
  }
  //Дилог добавление задачи
  fnOpenDialogCreateTask() {
    const dialogRef = this.dialogTask.open(DialogTaskComponent);
    dialogRef.afterClosed().subscribe((oTask: ifTask) => {
      if (oTask)
        this.taskService.fnCreateTask(oTask);

    });
  }
  //Диалог удаление задачи
  fnOpenDialogDeleteTask() {
    if (!this.isSelect()) return
    const dialogRef = this.dialogTask.open(DilogDeleteTaskComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.fnDeleteRow()
    });
  }
  //Удаление задачи ,row: ifTask
  fnDeleteRow() {

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
      this._snackBar.open(i18n.SELECT_ROW)
    }
    return isSelect
  }
  //запрет выбор дней на календаре

  //
  fnExit() {
    this.userService.fnSignOut()
    this.router.navigateByUrl('')
  }
}
