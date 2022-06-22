import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, map, Observable, ReplaySubject, Subject } from 'rxjs';
import { ITask } from 'src/app/shared/interfaces';

@Injectable({
  providedIn: 'root'
})

export class TaskService  {

  taskKey = 'tasks/';
  tasks: ITask[] = [];
  categories: string[] = [];
  categories$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([])
  tasks$: Subject<ITask[]> = new Subject<ITask[]>()
  constructor(
    private http: HttpClient
  ) { }

  createTask(task: ITask): Observable<boolean> {
    return this.http.post<boolean>('tasks', task)
  }
  deleteTask(task: ITask): Observable<boolean> {
    return this.http.delete<boolean>('tasks', { params: { 'id': task.id } })
  }
  editTask(oEditTask: ITask): Observable<boolean> {

    return this.http.put<boolean>('tasks', oEditTask)
  }
  getTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>('tasks').pipe(
      map((tasks: ITask[]) => {
        this.categories$.next(this.createCategory(tasks))
        return tasks
      })
    )
  }
  createCategory(tasks: ITask[]): string[] {
    this.categories = tasks.reduce((acc, v) => {
      !acc.includes(v.category) && v.category !== null && acc.push(v.category)
      return acc
    }, [] as string[])
    return this.categories

  }
}
