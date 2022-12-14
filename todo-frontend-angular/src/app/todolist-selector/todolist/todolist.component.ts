import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from '../todo.service';
import { ButtonConfiguration } from 'src/app/models/button-config.model';
import { NewTodoDTO } from 'src/app/models/new-todo-DTO.model';
import { Todolist } from 'src/app/models/todolist.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})

export class TodolistComponent implements OnInit {
  todos: Todo[] = [];
  todoLists:Todolist[]=[];
  selectedValue: Todolist | null =null;
  todos$: Observable<Todo[]> = this.todoService.todos$
  moreBtnConfig: ButtonConfiguration = {
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
        marginTop: '30px'
      }
    };

  constructor(private readonly todoService: TodoService) { }

  ngOnInit(): void {
   this.todoService.getTodoLists().subscribe({next:(response)=>{this.todoLists=response}});
  }

  onClickEventReceived() {
  }

  onCheckboxClick(isChecked: boolean, todo: Todo) {
    this.todoService.updateTodo({ ...todo, checked: isChecked }).subscribe({ next: () => this.todoService.getTodos('1') })
  }
  onTodolistSelect(value: Todolist) {
    if(value != null)
    {
      this.todoService.getTodos(value.todoListId.toString()).subscribe({next:(response)=>{this.todos=response.sort((a,b)=>a.position-b.position)}})
    }
    else{
      this.todos=[]
    }
    this.selectedValue=value;
  }
  onAddTodoSubmit(newTodo: NewTodoDTO) {
    this.todoService.addTodo(newTodo).subscribe({next:()=>this.onTodolistSelect(this.selectedValue!)})
  }
 
}
