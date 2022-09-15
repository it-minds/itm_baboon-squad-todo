import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';

@Pipe({
  name: 'sort'
})

export class SortPipe implements PipeTransform {
  transform<T>(values: T[] | null, field: keyof T): T[] | null {
    return values ? values.sort((a: T, b: T) => Number(a[field]) - Number(b[field])) : null;
  }
}
