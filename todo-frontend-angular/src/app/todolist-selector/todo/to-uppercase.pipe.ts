import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toUppercase'
})
export class ToUppercasePipe implements PipeTransform {

  transform(value: string | undefined): string {
    return value ? value.toUpperCase() : "";
  }

}
