import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { ifTask } from 'interfaces'; 
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  obTask = new Subject<ifTask>();
  constructor() { }
}
