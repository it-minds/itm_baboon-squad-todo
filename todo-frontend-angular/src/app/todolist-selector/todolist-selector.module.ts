import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todolist-selector-routing.module';
import { TodolistSelectorComponent } from './todolist-selector.component';
import { TodolistComponent } from './todolist/todolist.component';
import { ButtonComponent } from './button/my-button.component';
import { IconsProviderModule } from '../icons-provider.module';


@NgModule({
  declarations: [
    TodolistSelectorComponent,
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
