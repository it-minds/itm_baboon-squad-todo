import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent implements OnInit {
  todos: Todo[] = [];
  textBtnConfig = {
    styles: {
      position: 'relative',
      width: '150px',
      height: '60px',
      backgroundColor: '#f92672',
      color: '#fff',
      fontFamily: 'sans-serif',
      fontSize: '20px',
      borderRadius: '10px',
      marginTop: '30px'
    },
    text: 'Click Here'
  };
  constructor(private readonly todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.getTodos('8').subscribe(response=>{this.todos=response})
  }
  onClickEventReceived() {
    this.todoService.getTodos('8').subscribe(response=>{this.todos=response ; console.log(this.todos)})
  }
}
