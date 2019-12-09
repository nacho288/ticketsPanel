import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchUsuarioNombre'
})
export class SearchUsuarioNombrePipe implements PipeTransform {

  transform(value: any, args?: any): any {

    if (!value) return null;
    if (!args) return value;

    return value.filter(function (item) {
      return item.name.toLowerCase().includes(args.toLowerCase());
    });
  }

}
