import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { Todo } from '../models/todo.model';
import { Todolist } from '../models/todolist.model';
import { NewTodoDTO } from '../models/new-todo-DTO.model';


@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly url= 'https://localhost:7058/TodoList'
  private readonly todoUrl='https://localhost:7058/Todo'

  constructor(private http: HttpClient) 
  {
    
  }

  getTodos(id: string){
    return this.http.get<Todolist>(`${this.url}/${id}`).pipe(map(todolist=>todolist.todos));
  }
  addTodo(newTodo: NewTodoDTO){
    return this.http.post<Todo>(`${this.todoUrl}`, newTodo,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'accept': '*/*'
      })
    });
  }
  getTodoLists(){
    return this.http.get<Todolist[]>(`${this.url}`).pipe(map(todoList=>todoList));
  }
  
}
