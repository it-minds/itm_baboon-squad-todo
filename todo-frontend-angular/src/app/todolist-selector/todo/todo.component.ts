import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subtask } from 'src/app/models/subtask.model';
import { SubtaskComponent } from '../subtask/subtask.component';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  constructor(private readonly todoService: TodoService) { }

  @Input() todo?: Todo;
  @Input() showSubtasksOnTodoId?: number | null

  @Output() checkboxClick = new EventEmitter<boolean>();
  @Output() doubleClick = new EventEmitter();

  ngOnInit(): void {
  }

  onCheckboxClick(isChecked: boolean, subtask: Subtask) {
    this.todoService.updateSubtask({
      ...subtask, checked: isChecked
    }).subscribe({
      // next: () => {
      //   this.todoService.clearTodos()
      //   this.todoService.getTodos(this.todo!.todoListId.toString())
      // }
    })
  }
}
