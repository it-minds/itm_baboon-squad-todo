import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from '../todo.service';
import { ButtonConfiguration } from 'src/app/models/button-config.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent implements OnInit {
  todos$: Observable<Todo[]> = this.todoService.todos$
  textBtnConfig: ButtonConfiguration = {
    styles: {
      position: 'relative',
      width: '150px',
      height: '60px',
      backgroundColor: '#f92672',
      color: '#fff',
      fontFamily: 'sans-serif',
      fontSize: '20px',
      borderRadius: '10px',
      marginTop: '30px'
    }
  };
  constructor(private readonly todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.getTodos('1')
  }

  onClickEventReceived() {
  }

  onCheckboxClick(isChecked: boolean, todo: Todo) {
    this.todoService.updateTodo({ ...todo, checked: isChecked, todoListId: 1 }).subscribe({ next: () => this.todoService.getTodos('1') })
  }
}
