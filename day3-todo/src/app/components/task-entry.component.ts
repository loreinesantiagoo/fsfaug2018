import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-task-entry',
  templateUrl: './task-entry.component.html',
  styleUrls: ['./task-entry.component.css']
})
export class TaskEntryComponent implements OnInit {

  @ViewChild('taskForm')
  taskForm: NgForm;

  constructor() { }

  ngOnInit() { }

  addTask() {
    console.log('fields: ', this.taskForm.value);
    this.taskForm.resetForm();
  }

}
