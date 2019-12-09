import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'insumoCategoria'
})
export class InsumoCategoriaPipe implements PipeTransform {

  transform(value: any, args?: any): any {


    if (!value) return null;

    let filtrado = value.map(item => {
      item.disabled = item.stock == 0 ? true : false;
      return item;
    });

    if (args == null) return filtrado;

    let filtrado2 = filtrado.filter(function (item) {
      return item.subcategoria_id == args;
    });
       
    return filtrado2;
  }

}
