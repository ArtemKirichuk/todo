import { Pipe, PipeTransform } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ITask } from './shared/interfaces';

@Pipe({
  name: 'table',
 
})
export class TablePipe implements PipeTransform {

  transform(tasks:ITask[]|null): MatTableDataSource<ITask> {
    console.log(tasks)
    let a =   new MatTableDataSource(tasks?tasks:[])
    return a;
  }
}
