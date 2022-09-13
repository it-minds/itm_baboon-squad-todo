import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './todo.component';
import { TodolistComponent } from './todolist/todolist.component';
import { ButtonComponent } from './button/my-button.component';
import { IconsProviderModule } from '../icons-provider.module';


@NgModule({
  declarations: [
    TodoComponent,
    TodolistComponent,
    ButtonComponent
  ],
  imports: [
    CommonModule,
    TodoRoutingModule,
    IconsProviderModule
  ]
})
export class TodoModule { }
