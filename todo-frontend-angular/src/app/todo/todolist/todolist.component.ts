import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent implements OnInit {
  todos: any;
  constructor(private readonly todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.getTodos().subscribe(response=>{this.todos=response ; console.log(this.todos)})
  }
}
