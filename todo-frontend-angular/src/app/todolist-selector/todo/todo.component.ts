import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { NewTodoDTO } from 'src/app/models/new-todo-DTO.model';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  deadline: string = '';
  constructor() { }
  selectedTodo: Todo | null =null;

  @Input() todo?: Todo;
  @Output() checkboxClick = new EventEmitter<boolean>();
  @Output() Delete=new EventEmitter<Todo>();


  ngOnInit(): void {
    this.deadline = this.todo?.deadline?.split('T')[0] ?? "";
  }
  OnDeleteTodoEventReceived()
  {
    this.Delete.emit();
  }

}
