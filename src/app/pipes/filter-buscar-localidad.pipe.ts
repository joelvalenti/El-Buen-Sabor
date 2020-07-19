import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBuscarLocalidad',
})
export class FilterBuscarLocalidadPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    let result = [];
    if (args.toString() === '') {
      result = value;
    } else {
      for (const iterator of value) {
        if (iterator.domicilio.localidad.nombre === args.toString()) {
          result.push(iterator);
        }
      }
    }
    return result;
  }
}
