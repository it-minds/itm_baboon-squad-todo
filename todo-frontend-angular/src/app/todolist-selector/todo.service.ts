import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Todo } from '../models/todo.model';
import { Todolist } from '../models/todolist.model';
import { Subtask } from '../models/subtask.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly todolistUrl = 'https://localhost:7058/TodoList'
  private readonly todoUrl = 'https://localhost:7058/Todo'
  private readonly subtaskUrl = 'https://localhost:7058/Subtask'

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
      ).subscribe();
  }

  updateTodo(todo: Todo) {
    return this.http.put(`${this.todoUrl}`, todo, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    })
  }

  updateSubtask(subtask: Subtask) {
    return this.http.put(`${this.subtaskUrl}`, subtask, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    })
  }
}
