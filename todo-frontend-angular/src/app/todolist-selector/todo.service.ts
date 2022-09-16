import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map} from 'rxjs/operators';
import { Todo } from '../models/todo.model';
import { Todolist } from '../models/todolist.model';
import { NewTodoDTO } from '../models/new-todo-DTO.model';


@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly todolistUrl = 'https://localhost:7058/TodoList'
  private readonly todoUrl = 'https://localhost:7058/Todo'

  constructor(private http: HttpClient) {
  }

  getTodos(id: string) {
    console.log('getting todos')
    return this.http.get<Todolist>(`${this.todolistUrl}/${id}`).pipe(map(todolist => todolist.todos));
  }
  addTodo(newTodo: NewTodoDTO){
    console.log(newTodo)
    return this.http.post<NewTodoDTO>(`${this.todoUrl}`, newTodo,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'accept': '*/*'
      })
    });
  }
  getTodoLists(){
    return this.http.get<Todolist[]>(`${this.todolistUrl}`).pipe(map(todoList=>todoList));
  }
  updateTodo(todo: Todo) {
    return this.http.put(`${this.todoUrl}`, todo, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    })
  }
  deleteTodo(todo:Todo){
    return this.http.delete<Todo>(`${this.todoUrl}/${todo.todoId}` )
  }
}
