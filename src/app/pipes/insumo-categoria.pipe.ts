import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'insumoCategoria'
})
export class InsumoCategoriaPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    console.log(args);
    

    if (!value) return null;
    if (args == null) return value;

    return value.filter(function (item) {
      return item.subcategoria_id == args;
    });
  }

}
