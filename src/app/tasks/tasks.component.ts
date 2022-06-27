import { AfterViewInit, Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ITask, IFilter } from 'src/app/shared/interfaces';
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
import { priority, COLOR } from '../shared/data';
import { createFilter } from '../shared/helper';
import { MatSelectChange } from '@angular/material/select';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { BehaviorSubject, Observable, of, Subject, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TasksComponent implements OnInit, AfterViewInit,OnDestroy {
  priority = priority;
  @ViewChild(MatSort) sort!: MatSort;
  tasks: MatTableDataSource<ITask>;
  COLOR = COLOR;
  displayedColumns: string[] = [];
  selection = new SelectionModel<ITask>(false, []);
  filterValues: IFilter = {};
  isComplete: boolean = false;
  update$: Observable<ITask[]>;
  destroy$ = new Subject<void>();
  tasks$! : Observable<MatTableDataSource<ITask>>
  categories$:BehaviorSubject<string[]>
  login:string='';
  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private dialogTask: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {
    this.categories$ = this.taskService.categories$;
    //Колонки
    this.displayedColumns = ['select', 'name', 'dateStart', 'dateEnd', 'priority', 'category', 'complete', 'creator'];
    this.tasks = new MatTableDataSource();
    this.update$ = new Observable(observer => {
      this.login = userService.login;
      this.taskService.getTasks()
        .pipe(takeUntil(this.destroy$))
        .subscribe((tasks) => {
          
          this.tasks = new MatTableDataSource(tasks);
          this.tasks.filterPredicate = createFilter();
          // Куда это вытаскивать чтобы работало
          //фильтры
          this.filterValues['complete'] = this.isComplete ? true : '';
          this.tasks.filter = JSON.stringify(this.filterValues);
          //сортировка
          this.tasks.sort = this.sort;
          // this.cdr.detectChanges();
          this.tasks$ = of(this.tasks);
          // this.$testStrem.next(tasks)
          observer.next(tasks)
        })
    })
  }

  ngOnInit(): void {
    //авторизация. Переписать на гварды
    this.userService.checkAuth()
      .pipe(takeUntil(this.destroy$))
      .subscribe((login) => {
        if (!login) {
          this.snackBar.open(i18n.BAD_AUTH);
          this.router.navigateByUrl('');
          return
        }
        this.userService.fnSetLogin(login)
        this.update$
          .pipe(takeUntil(this.destroy$))
          .subscribe()
      })
  }

  ngAfterViewInit(): void {
    this.tasks.sort = this.sort;
  }
  // Фильтры
  filterComplete(e: MatCheckboxChange): void {
    this.filterValues['complete'] = e.checked ? true : '';
    this.tasks.filter = JSON.stringify(this.filterValues);
  }
  filterCategory(value: MatSelectChange): void {
    this.filterValues['category'] = value.value;
    this.tasks.filter = JSON.stringify(this.filterValues);
  }
  //Дилог добавление задачи
  openDialogCreateTask(): void {
    const dialogRef = this.dialogTask.open(DialogTaskComponent);
    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((task: ITask) => {
        if (task)
          this.taskService.createTask(task)
            .pipe(
              switchMap(() => this.update$),
              takeUntil(this.destroy$)
            )
            .subscribe();
      });
  }
  //редактирование задачи
  editRow(): void {
    if (!this.isSelect()) return
    const dialogRef = this.dialogTask.open(DialogTaskComponent, { data: this.selection.selected[0] });
    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((task: ITask) => {
        if (task)
          this.taskService.editTask(task)
            .pipe(
              switchMap(() => this.update$),
              takeUntil(this.destroy$)
            )
            .subscribe();
      });
  }
  //Диалог удаление задачи
  openDialogDeleteTask(): void {
    if (!this.isSelect()) return;
    const dialogRef = this.dialogTask.open(DilogDeleteTaskComponent);
    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result)
          this.deleteRow();
      });
  }
  //Удаление задачи ,row: ITask
  deleteRow(): void {
    let task = this.selection.selected[0];
    
    this.taskService.deleteTask(task)
      .pipe(
        switchMap(() => this.update$),
        takeUntil(this.destroy$)
      )
      .subscribe((tasks)=>{
        this.selection.clear();
      });
  }

  //Проверка
  isSelect(): boolean {
    let task = this.selection.selected[0];
    let isSelect = task ? true : false;
    if (!isSelect) {
      this.snackBar.open(i18n.SELECT_ROW);
    }
    return isSelect;
  }
  //запрет выбор дней на календаре
  exit(): void {
    this.userService.signOut();
    this.router.navigateByUrl('');
  }
  ngOnDestroy(): void {
    this.destroy$.next()
  }
}
