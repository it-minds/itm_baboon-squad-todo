import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodolistSelectorRoutingModule } from './todolist-selector-routing.module';
import { TodolistSelectorComponent } from './todolist-selector.component';
import { TodolistComponent } from './todolist/todolist.component';
import { ButtonComponent } from './button/my-button.component';
import { IconsProviderModule } from '../icons-provider.module';
import { TodoComponent } from './todo/todo.component';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToUppercasePipe } from './todo/to-uppercase.pipe';
import { SortPipe } from './todolist/sort.pipe';
import { SubtaskComponent } from './subtask/subtask.component';
import { RemoveDuplicatesPipe } from './remove-duplicates.pipe';
import { AddTodolistModalComponent } from './add-todolist-modal/add-todolist-modal.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzModalModule } from 'ng-zorro-antd/modal';



@NgModule({
  declarations: [
    TodolistSelectorComponent,
    TodolistComponent,
    ButtonComponent,
    TodoComponent,
    ToUppercasePipe,
    SortPipe,
    SubtaskComponent,
    RemoveDuplicatesPipe,
    AddTodolistModalComponent,
  ],
  imports: [
    CommonModule,
    TodolistSelectorRoutingModule,
    IconsProviderModule,
    NzCheckboxModule,
    NzGridModule,
    FormsModule,
    NzModalModule,
    NzFormModule,
    ReactiveFormsModule
  ]
})
export class TodolistSelectorModule { }
