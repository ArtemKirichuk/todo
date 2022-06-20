import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ITask } from 'src/app/shared/interfaces';

@Injectable({
  providedIn: 'root'
})

export class TaskService implements OnInit {
  
  taskKey = 'tasks/';
  tasks: ITask[] = [];
  categories: string[] = [];
  $tasks: Subject<ITask[]> = new Subject<ITask[]>()
  $categories: Subject<string[]> = new Subject<string[]>()
  noCategory = 'БЕЗ КАТЕГОРИИ';
  constructor(
    private http: HttpClient
  ) { }
  ngOnInit(): void { }

  createTask(task: ITask):void {
    this.http.post('tasks', task).subscribe((e) => {
      this.getTasks()
    })
  }
  deleteTask(task: ITask):void {
    this.http.delete('tasks', { params: { 'id': task.id } })
      .subscribe((res) => {
        this.getTasks()
      })
  }
  editTask(oEditTask: ITask):void {

    this.http.put('tasks', oEditTask)
      .subscribe((res) => {
        this.getTasks()
      })
  }
  getTasks():void {
    this.http.get<ITask[]>('tasks')
      .subscribe((tasks: ITask[]) => {
        //Собираем категории
        this.$tasks.next(tasks)
        this.$categories.next(this.createCategory(tasks))
      });
  }
  createCategory(tasks: ITask[]): string[] {
    this.categories = tasks.reduce((acc, v) => {
      
      !acc.includes(v.category) && v.category !== null && acc.push(v.category)
        
      return acc
    }, [] as string[])
    return this.categories

  }
}
