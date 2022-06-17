import { Pipe, PipeTransform } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ifTask } from './shared/interfaces';

@Pipe({
  name: 'table',
 
})
export class TablePipe implements PipeTransform {

  transform(aTasks:ifTask[]|null): MatTableDataSource<ifTask> {
    console.log(aTasks)
    let a =   new MatTableDataSource(aTasks?aTasks:[])
    return a;
  }

}
