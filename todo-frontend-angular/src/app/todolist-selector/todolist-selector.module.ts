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
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TodolistSelectorComponent,
    TodolistComponent,
    ButtonComponent,
    TodoComponent,
  ],
  imports: [
    CommonModule,
    TodolistSelectorRoutingModule,
    IconsProviderModule,
    NzCheckboxModule,
    NzGridModule,
    FormsModule
  ]
})
export class TodolistSelectorModule { }
