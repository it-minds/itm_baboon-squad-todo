import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly url= 'https://localhost:7058/TodoList/8'

  constructor(private httpClient: HttpClient) 
  {
  
  }

  getTodos(){
    return this.httpClient.get(this.url);
  }
  
}
