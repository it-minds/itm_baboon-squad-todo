import { Component, OnInit, Output } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from '../todo.service';
import { ButtonConfiguration } from 'src/app/models/button-config.model';
import { NewTodoDTO } from 'src/app/models/new-todo-DTO.model';
import { Todolist } from 'src/app/models/todolist.model';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { outputAst } from '@angular/compiler';


@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent implements OnInit {
  todos: Todo[] = [];
  todoLists:Todolist[]=[];
  selectedValue: Todolist | null =null;
  modalText="Add a new todo";

  constructor(private readonly todoService: TodoService) { }
  ngOnInit(): void {
   this.todoService.getTodoLists().subscribe({next:(response)=>{this.todoLists=response}});
  }


  onCheckboxClick(isChecked: boolean, todo: Todo) {
    this.todoService.updateTodo({ ...todo, checked: isChecked, todoListId: this.selectedValue!.todoListId }).subscribe()
  }
  onSelectClickEventReceived(value: Todolist) {
    if(value != null)
    {
      this.todoService.getTodos(value.todoListId.toString()).subscribe({next:(response)=>{this.todos=response.sort((a,b)=>a.position-b.position)}})
    }
    else{
      this.todos=[]
    }
    this.selectedValue=value;
  }
  onAddTodoEventReceived(newTodo: NewTodoDTO) {
    this.todoService.addTodo(newTodo).subscribe({next:()=>this.onSelectClickEventReceived(this.selectedValue!)})
    
  }
  onDeleteTodoEventReceived(todo: Todo)
  {
    this.todoService.deleteTodo(todo).subscribe({next:()=>this.onSelectClickEventReceived(this.selectedValue!)})
  }
 
}
