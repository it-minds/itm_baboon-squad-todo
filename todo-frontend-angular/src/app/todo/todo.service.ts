import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private url: ''
  constructor(private httpClient: HttpClient) 
  {
  
  }
  getTodos()
  {
    this.httpClient.getAll(Todo).then((todos:Todo[])=>{
      this.getTodos.push(..todos);
    })
    return this.
  }
  
}
