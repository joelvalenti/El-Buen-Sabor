import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBuscarReceta',
})
export class FilterBuscarRecetaPipe implements PipeTransform {
  transform(value: any, ...args: any): any {
    const result = [];
    for (const iterator of value) {
      if ((iterator.nombre.toLowerCase()).indexOf((args.toString()).toLowerCase()) > -1) {
        result.push(iterator);
      }
    }
    return result;
  }
}
