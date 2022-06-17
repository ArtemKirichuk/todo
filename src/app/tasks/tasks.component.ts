import { AfterViewInit, Component, OnInit, ViewChild, ChangeDetectionStrategy, AfterContentInit, ChangeDetectorRef } from '@angular/core';
import { ifTask, ifFilter } from 'src/app/shared/interfaces';
import { TaskService } from '../task.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogTaskComponent } from './dialog-task/dialog-task.component';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { MatSnackBar } from '@angular/material/snack-bar';
import { i18n } from 'src/i18n';
import { DilogDeleteTaskComponent } from './dilog-delete-task/dilog-delete-task.component';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { aPriority, COLOR } from '../shared/data';
import { createFilter } from '../shared/helper';
import { MatSelectChange } from '@angular/material/select';
import { MatCheckboxChange } from '@angular/material/checkbox';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TasksComponent implements OnInit, AfterViewInit {
  aPriority = aPriority
  @ViewChild(MatSort) sort!: MatSort;
  aData: MatTableDataSource<ifTask>;
  COLOR = COLOR
  aDisplayedColumns: string[] = []
  selection = new SelectionModel<ifTask>(false, []);
  aCategory: string[] = []
  oFilterValues: ifFilter = {}
  bComplete: boolean = false;
  sCategory = ''
  constructor(
    public taskService: TaskService,
    public userService: UserService,
    private dialogTask: MatDialog,
    private router: Router,
    private _snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {
    //Колонки
    this.aDisplayedColumns = ['select', 'name', 'dateStart', 'dateEnd', 'priority', 'category', 'complete', 'creator'];
    this.aData = new MatTableDataSource();
  }

  ngOnInit(): void {
    //авторизация. Переписать на гварды
    this.userService.fnCheckAuth().subscribe((sLogin) => {
      if (!sLogin) {
        this._snackBar.open(i18n.BAD_AUTH)
        this.router.navigateByUrl('');
        return
      }
      this.userService.fnSetLogin(sLogin)
      this.taskService.obTask.subscribe((aTasks) => {

        this.aData = new MatTableDataSource(aTasks);
        this.aData.filterPredicate = createFilter();

        // Куда это вытаскивать чтобы работало
        //фильтры
        this.oFilterValues['complete'] = this.bComplete ? true : '';
        this.aData.filter = JSON.stringify(this.oFilterValues)
        //сортировка
        this.aData.sort = this.sort;
        //
        this.cdr.detectChanges()
      })
      //как это сделать лучше.?
      this.taskService.fnGetTasks()
    })
  }

  ngAfterViewInit() {
    this.aData.sort = this.sort;
  }
  // Фильтры
  fnFilterComplete(e: MatCheckboxChange) {

    this.oFilterValues['complete'] = e.checked ? true : '';
    this.aData.filter = JSON.stringify(this.oFilterValues);

  }
  fnFilterCategory(value: MatSelectChange) {
    this.oFilterValues['category'] = value.value;
    this.aData.filter = JSON.stringify(this.oFilterValues);

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
  fnExit() {
    this.userService.fnSignOut()
    this.router.navigateByUrl('')
  }
}
