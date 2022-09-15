import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Todo } from '../models/todo.model';
import { Todolist } from '../models/todolist.model';
import { NewTodoDTO } from '../models/new-todo-DTO.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly todolistUrl =  `${environment.apiURL}/TodoList`
  private readonly todoUrl = `${environment.apiURL}/Todo`

  private readonly todos = new BehaviorSubject<Todo[]>([])

  public get todos$() {
    return this.todos.asObservable();
  }

  constructor(private http: HttpClient) {
  }

  getTodos(id: string) {
    return this.http.get<Todolist>(`${this.todolistUrl}/${id}`)
      .pipe(
        map(todolist => todolist.todos),
        tap(todos => this.todos.next(todos))
      );
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
    return this.http.get<Todolist[]>(`${this.todolistUrl}`).pipe(map(todoList=>todoList));
  }
  updateTodo(todo: Todo) {
    return this.http.put(`${this.todoUrl}`, todo, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    })
  }
}
