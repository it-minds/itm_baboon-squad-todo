import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormControl,Validators, FormGroup } from '@angular/forms';
import { NewTodoDTO } from 'src/app/models/new-todo-DTO.model';
import { ButtonConfiguration } from 'src/app/models/button-config.model';
import { Todo } from 'src/app/models/todo.model';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { TodoService } from '../todo.service';
import { TodolistComponent } from '../todolist/todolist.component';

@Component({
  selector: 'app-todo-modal',
  templateUrl: './todo-modal.component.html',
  styleUrls: ['./todo-modal.component.scss']
})
export class TodoModalComponent {
  isOkLoading = false;
  newTodo: NewTodoDTO | undefined;
  editedTodo: Todo | undefined;
  validateForm: FormGroup<{
    title: FormControl<string | null>;
    datePicker: FormControl<Date | null>;
}> = new FormGroup({
  title: new FormControl<string | null>(null, [Validators.required, Validators.minLength(1)]),
  datePicker: new FormControl<Date | null>(null,[Validators.required,Validators.minLength(8)])
}) 
  constructor(private todolist: TodolistComponent, private service: TodoService, private modal: NzModalRef) { }
  @Input() position?: number;
  @Input() isEditDeadline?: boolean;
  @Input() isEditTitle?: boolean;
  @Input() todo?: Todo;
  @Input() listId?: number;
  @Input() isNewTodo?: boolean;
  
  
  handleSubmit(): void {
    this.editedTodo=this.todo;
    if(this.validateForm.valid)
    {
      this.isOkLoading = true;
      if(this.isNewTodo)
      {
        const position= this.position!=null ? this.position : 0
        this.newTodo={
        Title: this.validateForm.value.title?? "",
        Deadline: this.validateForm.value.datePicker?.toISOString()?? "",
        Position:  position,
        TodoListId: this.listId!,
         }
         this.todolist.onAddTodoEventReceived(this.newTodo)
      }
      else if(this.isEditDeadline)
      {
        this.editedTodo!.deadline = this.validateForm.value.datePicker?.toISOString()?? ""
        this.service.updateTodo(this.editedTodo!).subscribe();
      }
      else if(this.isEditTitle)
      {
        this.editedTodo!.title = this.validateForm.value.title?? "";
        this.service.updateTodo(this.editedTodo!).subscribe()
      }
        this.isOkLoading = false
        this.destroyModal()
        this.validateForm.reset()
    }
  }
  handleCancel(): void {
    this.validateForm.reset()
    this.destroyModal()
  }
  ngOnInit(): void {
  }
  destroyModal()
  {
    this.modal.destroy()
  }

}
