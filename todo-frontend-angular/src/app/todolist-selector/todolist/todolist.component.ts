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
  todolistIds: string[] = []
  showSubtasksOnTodoId: number | null = null
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
    this.todoService.clearTodos()
    this.todoLists = [
      { title: "hello", todolistId: 1, todos: [] },
      { title: "hello", todolistId: 2, todos: [] },
      { title: "hi", todolistId: 3, todos: [] },
    ]

    const selectedTodoList = { title: "hello", todolistId: 1, todos: [] }

    this.todoLists.filter(todolist => todolist.title === selectedTodoList.title).forEach(todolist => {
      this.todolistIds.push(todolist.todolistId.toString())
    })

    this.todolistIds.forEach(todolistId => {
      this.todoService.getTodos(todolistId)
    });

  }

  onAddTodolistSubmit(title: string) {

  }

  onDoubleClick(todo: Todo) {
    this.showSubtasksOnTodoId = this.showSubtasksOnTodoId === todo.todoListId ? null : todo.todoId
  }

  onClickEventReceived() {
  }

  onCheckboxClick(isChecked: boolean, todo: Todo) {
    this.todoService.updateTodo({
      ...todo, checked: isChecked
    }).subscribe({
      // next: () => {
      //   this.todoService.clearTodos()
      //   this.todolistIds.forEach(todolistId => {
      //     this.todoService.getTodos(todolistId)
      //   })
      // }
    })
  }
}
