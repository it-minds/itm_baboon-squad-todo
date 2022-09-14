import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  deadline: string = '';
  constructor() { }

  @Input() todo?: Todo;

  @Output() checkboxClick = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.deadline = this.todo?.deadline?.split('T')[0] ?? "";
  }

}
