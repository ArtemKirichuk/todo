import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject, switchMap } from 'rxjs';
import { ifTask } from 'src/app/shared/interfaces';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})

export class TaskService implements OnInit {
  // obTask!: BehaviorSubject<ifTask[]>;
  sTaskKey = 'tasks/';
  sTaskUserKey!: string;
  aTasks: ifTask[] = [];
  
  obTask: Subject<ifTask[]> = new Subject<ifTask[]>()
  obCategory: Subject<string[]> = new Subject<string[]>()
  constructor(
    private userService: UserService,
    private http: HttpClient
  ) { }
  ngOnInit(): void { }

  fnCreateTask(oTask: ifTask) {
    this.http.post('tasks', oTask).subscribe((e) => {
      this.fnGetTasks()
    })
    // this.obTask.next(this.aTasks);
  }
  fnDeleteTask(oTask: ifTask) {
    this.http.delete('tasks', { params: { 'id': oTask.id } })
      .subscribe((res) => {
        this.fnGetTasks()
      })
  }
  fnEditTask(oEditTask: ifTask) {

    this.http.put('tasks', oEditTask)
      .subscribe((res) => {
        this.fnGetTasks()
      })
  }
  fnGetTasks() {
    this.http.get<ifTask[]>('tasks')
      .subscribe((aTasks: ifTask[]) => {
        //Собираем категории
        this.obTask.next(aTasks)
        this.obCategory.next(this.fnCreateCategory(aTasks))
      });
  }
  aCategory:string[] = [];
  fnCreateCategory(aTasks: ifTask[]): string[] {
    this.aCategory = aTasks.reduce((acc, v) => {
      acc.indexOf(v.category) === -1 && acc.push(v.category)
      return acc
    }, [] as string[] )
    return this.aCategory

  }
}
