import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeDuplicates'
})
export class RemoveDuplicatesPipe implements PipeTransform {
  transform<T>(values: T[] | null, field: keyof T): T[] | null {
    if (!values) return null
    const seen = new Set();
    return values.filter(value => {
      const duplicate = seen.has(value[field]);
      seen.add(value[field]);
      return !duplicate;
    });
  }
}
