import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { TodoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './todo.component';
import { TodolistComponent } from './todolist/todolist.component';
import { ButtonComponent } from './button/my-button.component';
import { IconsProviderModule } from '../icons-provider.module';
import { AddTodoModalComponent } from './add-todo-modal/add-todo-modal.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TodoComponent,
    TodolistComponent,
    ButtonComponent,
    AddTodoModalComponent
  ],
  imports: [
    CommonModule,
    TodoRoutingModule,
    IconsProviderModule,
    NzModalModule,
    NzFormModule,
    NzDatePickerModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TodoModule { }
