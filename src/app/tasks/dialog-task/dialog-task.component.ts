import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ifTask } from 'src/app/shared/interfaces';
import { TaskService } from 'src/app/task.service';
import { clValidator } from 'src/app/shared/fn.validator';
import { aPriority } from 'src/app/shared/data';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-dialog-task',
  templateUrl: './dialog-task.component.html',
  styleUrls: ['./dialog-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogTaskComponent implements OnInit {
  aPriority = aPriority
  oFormTask = new FormGroup({
    name: new FormControl(this.oTask?.name, [Validators.required]),
    dateStart: new FormControl(this.oTask?.dateStart, [
      Validators.required,
      clValidator.dateStart()
    ]),
    dateEnd: new FormControl(this.oTask?.dateEnd, [
      Validators.required,
      clValidator.dateEnd()
    ]),
    priority: new FormControl(this.oTask?.priority, [Validators.required]),
    category: new FormControl(this.oTask?.category, [Validators.required]),
    complete: new FormControl(!!this.oTask?.complete)
  })

  get dateStart() { return this.oFormTask.get('dateStart'); }
  get dateEnd() { return this.oFormTask.get('dateEnd')!; }
  get category() { return this.oFormTask.get('category')!; }


  filteredOptions!: Observable<string[]>;
  aCategory: string[] = []
  bCreate: boolean;

  constructor(
    public taskService: TaskService,
    private dialogTask: MatDialogRef<DialogTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public oTask: ifTask
  ) {
    this.bCreate = oTask ? false : true;
    this.aCategory = taskService.aCategory
    

  }

  ngOnInit(): void {
    
    this.filteredOptions = this.category.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    // this.taskService.obCategory.subscribe()
    return this.aCategory.filter(sCategoty => sCategoty.toLowerCase().includes(filterValue));
  }
 
  fnDateChange() {
    this.oFormTask.controls['dateStart'].updateValueAndValidity()
    this.oFormTask.controls['dateEnd'].updateValueAndValidity()
  }
  //Сохранить изменения
  fnSaveRow() {
    Object.assign(this.oTask, this.oFormTask.value)
    this.taskService.fnEditTask(this.oTask);
  }
  fnGEToday = (d: Date | null): boolean => {
    const day = (d || new Date());
    return day !== null && day.getTime() >= new Date().setHours(0, 0, 0, 0)
  };
}

