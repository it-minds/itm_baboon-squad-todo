import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodolistSelectorComponent } from './todolist-selector.component';

const routes: Routes = [{ path: '', component: TodolistSelectorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodolistSelectorRoutingModule { }
