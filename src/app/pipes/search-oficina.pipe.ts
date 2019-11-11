import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchOficina'
})
export class SearchOficinaPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    if (!value) return null;
    if (!args) return value;

    args = args.toLowerCase();

    return value.filter(function (item) {
      return JSON.stringify(item.nombre).toLowerCase().includes(args);
    });
  }

}
