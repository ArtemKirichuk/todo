import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITask } from 'src/app/shared/interfaces';
import { TaskService } from 'src/app/task.service';
import { CustomValidator } from 'src/app/shared/fn.validator';
import { priority } from 'src/app/shared/data';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-dialog-task',
  templateUrl: './dialog-task.component.html',
  styleUrls: ['./dialog-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogTaskComponent implements OnInit {
  priority = priority;
  formTask = new FormGroup({
    name: new FormControl(this.task?.name, [Validators.required]),
    dateStart: new FormControl(this.task?.dateStart, [
      Validators.required,
      CustomValidator.dateStart()
    ]),
    dateEnd: new FormControl(this.task?.dateEnd, [
      Validators.required,
      CustomValidator.dateEnd()
    ]),
    priority: new FormControl(this.task?.priority, [Validators.required]),
    category: new FormControl(this.task?.category),
    complete: new FormControl(!!this.task?.complete)
  });

  get dateStart() { return this.formTask.get('dateStart'); };
  get dateEnd() { return this.formTask.get('dateEnd')!; };
  get category() { return this.formTask.get('category')!; };

  filteredOptions!: Observable<string[]>;
  categories: string[] = [];
  isCreate: boolean;

  constructor(
    public taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) public task: ITask,
    // private dialogRef : MatDialogRef
  ) {
    this.isCreate = task ? false : true;
    this.categories = taskService.categories;
  }

  ngOnInit(): void {
    this.filteredOptions = this.category.valueChanges.pipe(
      startWith(''),
      map(value => this.filterCategory(value || '')),
    );
  }

  private filterCategory(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.categories.filter(e => e.toLowerCase().includes(filterValue));
  }

  changeDate(): void {
    this.formTask.controls['dateStart'].updateValueAndValidity();
    this.formTask.controls['dateEnd'].updateValueAndValidity();
  }
  //Сохранить изменения
  saveRow(): void {
    Object.assign(this.task, this.formTask.value);
    // this.taskService.editTask(this.task);
  }
  compareCompleteDate = (d: Date | null): boolean => {
    const day = (d || new Date());
    return day !== null && day.getTime() >= new Date().setHours(0, 0, 0, 0);
  };
}

