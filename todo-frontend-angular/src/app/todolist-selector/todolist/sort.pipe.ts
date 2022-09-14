import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})

export class SortPipe implements PipeTransform {
  transform(todos: any[], field: string): any[] {
    return todos.sort((a: any, b: any) => a[field] - b[field]);
  }
}
