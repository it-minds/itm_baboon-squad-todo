import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from '../todo.service';
import { ButtonConfiguration } from 'src/app/models/button-config.model';
import { Observable } from 'rxjs';
import { Todolist } from 'src/app/models/todolist.model';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent implements OnInit {
  todos$: Observable<Todo[]> = this.todoService.todos$
  todoLists: Todolist[] = [];
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
    this.todoLists = [
      { title: "hello", todolistId: 1, todos: [] },
      { title: "hi", todolistId: 2, todos: [] },
      { title: "hello", todolistId: 3, todos: [] },
    ]
    const seen = new Set();
    const filteredList = this.todoLists.filter(value => {
      const duplicate = seen.has(value['title' as keyof Todolist]);
      seen.add(value['title' as keyof Todolist]);
      return !duplicate;
    });
    console.log(filteredList)

    this.todoService.getTodos('1')
  }

  onClickEventReceived() {
  }

  onCheckboxClick(isChecked: boolean, todo: Todo) {
    this.todoService.updateTodo({ ...todo, checked: isChecked }).subscribe({ next: () => this.todoService.getTodos('1') })
  }
}
