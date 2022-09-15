import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Todo } from '../models/todo.model';
import { Todolist } from '../models/todolist.model';
import { Subtask } from '../models/subtask.model';
import { id_ID } from 'ng-zorro-antd/i18n';

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

  clearTodos() {
    this.todos.next([]);
  }

  getTodos(id: string) {
    return this.http.get<Todolist>(`${this.todolistUrl}/${id}`)
      .pipe(
        map(todolist => todolist.todos),
        tap(todos => {
          this.todos.next(this.todos.value.concat(todos))
        })
      ).subscribe()
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
