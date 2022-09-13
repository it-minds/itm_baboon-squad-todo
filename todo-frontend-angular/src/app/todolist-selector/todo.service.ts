import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { Todo } from '../models/todo.model';
import { Todolist } from '../models/todolist.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly todolistUrl = 'https://localhost:7058/TodoList'
  private readonly todoUrl = 'https://localhost:7058/Todo'

  constructor(private http: HttpClient) {
  }

  getTodos(id: string) {
    return this.http.get<Todolist>(`${this.todolistUrl}/${id}`).pipe(map(todolist => todolist.todos));
  }

  updateTodo(todo: Todo) {
    return this.http.put(`${this.todoUrl}`, todo, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    })
  }
}
