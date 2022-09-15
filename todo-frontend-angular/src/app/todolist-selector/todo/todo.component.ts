import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subtask } from 'src/app/models/subtask.model';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  showSubtasks: boolean = false
  constructor(private readonly todoService: TodoService) { }

  @Input() todo?: Todo;

  @Output() checkboxClick = new EventEmitter<boolean>();

  ngOnInit(): void {
  }

  onDoubleClick(): void {
    this.showSubtasks = !this.showSubtasks
  }

  onCheckboxClick(isChecked: boolean, subtask: Subtask) {
    console.log(subtask)
    this.todoService.updateSubtask({ ...subtask, checked: isChecked }).subscribe({ next: () => this.todoService.getTodos('1') })
  }
}
