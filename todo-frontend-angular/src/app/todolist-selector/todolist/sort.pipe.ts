import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';

@Pipe({
  name: 'sort'
})

export class SortPipe implements PipeTransform {
  transform(todos: any[] | null, field: string): any[] {
    return todos ? todos.sort((a: any, b: any) => a[field] - b[field]) : [];
  }
}
