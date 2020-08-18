import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBuscarReceta',
})
export class FilterBuscarRecetaPipe implements PipeTransform {
  transform(value: any, args: string): any {
    const result = [];
    if (args.toString.length === 0) {
      return value;
    }
    for (const iterator of value) {
      if (
        iterator.nombre.toLowerCase().indexOf(args.toString().toLowerCase()) >
        -1
      ) {
        result.push(iterator);
      }
    }
    return result;
  }
}
