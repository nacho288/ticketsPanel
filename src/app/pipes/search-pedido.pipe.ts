import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPedido'
})
export class SearchPedidoPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    if (!value) return null;
    if (!args) return value;

    args = args.toLowerCase();

    return value.filter(function (item) {
      let cadena = item.user + " " + item.oficina;
      return cadena.toLowerCase().includes(args);
    });
  }

}
