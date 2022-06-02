import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dialog-task',
  templateUrl: './dialog-task.component.html',
  styleUrls: ['./dialog-task.component.scss']
})
export class DialogTaskComponent implements OnInit {
  oFormTask = new FormGroup({
    name: new FormControl(''),
    dateStart: new FormControl(new Date()),
    dateEnd: new FormControl(new Date()),
    priority: new FormControl(''),
    category: new FormControl('')
  })

  constructor() { }

  ngOnInit(): void {
  }
  fnCreteTask(){

  }
}
