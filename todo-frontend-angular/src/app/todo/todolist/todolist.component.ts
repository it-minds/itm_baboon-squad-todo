import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from '../todo.service';
import { ButtonConfiguration } from 'src/app/models/button-config.model';
import { NewTodoDTO } from 'src/app/models/new-todo-DTO.model';
import { Todolist } from 'src/app/models/todolist.model';
import { NzSelectModule } from 'ng-zorro-antd/select';



@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent implements OnInit {
  todos: Todo[] = [];
  todoLists:Todolist[]=[];
  selectedValue: Todolist | null =null;
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
   this.todoService.getTodoLists().subscribe({next:(response)=>{this.todoLists=response}});
  }
  onClickEventReceived() {
    console.log('click')
    this.todoService.getTodos('8').subscribe({next:(response)=>{this.todos=response.sort((a,b)=>a.position-b.position)}})
  }
  onSelectClickEventReceived(value: Todolist) {
    console.log(value)
    if(value != null)
    {
      this.todoService.getTodos(value.todoListId.toString()).subscribe({next:(response)=>{this.todos=response.sort((a,b)=>a.position-b.position)}})
    }

  }
  onAddTodoEventReceived(newTodo: NewTodoDTO) {
    console.log(newTodo)
    this.todoService.addTodo(newTodo).subscribe()
  }
 
}
