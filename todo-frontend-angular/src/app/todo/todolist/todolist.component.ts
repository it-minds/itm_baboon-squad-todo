import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from '../todo.service';
import { ButtonConfiguration } from 'src/app/models/button-config.model';
import { NzModalModule } from 'ng-zorro-antd/modal';


@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent implements OnInit {
  todos: Todo[] = [];
  moreBtnConfig: ButtonConfiguration= {
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
    }
  };
    addBtnConfig: ButtonConfiguration= {
      styles: {
        position: 'relative',
        width: '150px',
        height: '60px',
        backgroundColor: '#f92672',
        color: '#fff',
        fontFamily: 'sans-serif',
        fontSize: '20px',
        borderRadius: '10px',
        marginTop: '30px',
        
      }
    };
  constructor(private readonly todoService: TodoService) { }

  ngOnInit(): void {
  }
  onClickEventReceived() {
    console.log('click')
    this.todoService.getTodos('8').subscribe({next:(response)=>{this.todos=response.sort((a,b)=>a.position-b.position)}})
  }
 
}
