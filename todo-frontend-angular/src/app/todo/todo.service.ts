import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { Todo } from '../models/todo.model';
import { Todolist } from '../models/todolist.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly url= 'https://localhost:7058/TodoList/'

  constructor(private http: HttpClient) 
  {
    
  }

  getTodos(id: string){
    return this.http.get<Todolist>(`${this.url}${id}`).pipe(map(todolist=>todolist.todos));
  }
  
}
