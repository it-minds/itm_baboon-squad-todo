import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from '../todo.service';
import { ButtonConfiguration } from 'src/app/models/button-config.model';
import { NewTodoDTO } from 'src/app/models/new-todo-DTO.model';
import { Todolist } from 'src/app/models/todolist.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})

export class TodolistComponent implements OnInit {
  todoLists: Todolist[] = [];
  selectedValue: Todolist | null = null;
  todos$: Observable<Todo[]> = this.todoService.todos$
  todolistIds: string[] = []
  showSubtasksOnTodoId: number | null = null
  moreBtnConfig: ButtonConfiguration = {
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
  addBtnConfig: ButtonConfiguration = {
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
    this.todoService.getTodoLists().subscribe({ next: (response) => { this.todoLists = response } });
  }

  onAddTodolistSubmit(title: string) {

  }

  onAddTodolistSubmit(title: string) {

  }

  onDoubleClick(todo: Todo) {
    this.showSubtasksOnTodoId = this.showSubtasksOnTodoId === todo.todoListId ? null : todo.todoId
  }
  onCheckboxClick(isChecked: boolean, todo: Todo) {
    this.todoService.updateTodo({
      ...todo, checked: isChecked
    }).subscribe()
  }
  onTodolistSelect(value: Todolist) {
    this.todoService.clearTodos()
    this.todolistIds = []
    this.selectedValue = value;
    if (value != null) {
      this.todoLists.filter(todolist => todolist.title === value.title)
        .forEach(todolist => {
          this.todolistIds.push(todolist.todoListId.toString())
          this.todoService.getTodos(todolist.todoListId.toString())
        });
    }
  }
  onAddTodoSubmit(newTodo: NewTodoDTO) {
    this.todoService.addTodo(newTodo).subscribe({ next: () => this.onTodolistSelect(this.selectedValue!) })
  }

}
