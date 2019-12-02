import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrarEntregadas'
})
export class FiltrarEntregadasPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    if (!value) return null;
    if (args) return value;

    return value.filter(function (item) {
      return item.estado != 3;
    });
  }


}
