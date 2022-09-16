import { Component, EventEmitter, Output, Input, ViewContainerRef  } from '@angular/core';
import { FormControl,Validators, FormGroup } from '@angular/forms';
import { ButtonConfiguration } from 'src/app/models/button-config.model';
import {  NzModalService } from 'ng-zorro-antd/modal';
import { TodoModalComponent } from '../todo-modal/todo-modal.component';
import { Todo } from 'src/app/models/todo.model';
import { NewTodoDTO } from 'src/app/models/new-todo-DTO.model';

@Component({
  selector: 'app-add-todo-modal',
  templateUrl: './add-todo-modal.component.html',
  styleUrls: ['./add-todo-modal.component.scss']
})
export class AddTodoModalComponent {
  isVisible = false;
  isOkLoading = false;

  ButtonText="Add a new todo";
  validateForm: FormGroup<{
    title: FormControl<string | null>;
    datePicker: FormControl<Date | null>;
}> = new FormGroup({
  title: new FormControl<string | null>(null, [Validators.required, Validators.minLength(1)]),
  datePicker: new FormControl<Date | null>(null,[Validators.required,Validators.minLength(8)])
}) 
constructor(private modal: NzModalService, private viewContainerRef: ViewContainerRef){
}
@Input() todoListId?: number;

  showModal(): void {
    const modal = this.modal.create({
      nzTitle: 'Modal Title',
      nzContent: TodoModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {
        listId: this.todoListId,
        isNewTodo: true
      },
      nzMaskClosable: false,
      nzFooter:null
    });
    const instance = modal.getContentComponent();
  }
  ngOnInit(): void {
  }
}