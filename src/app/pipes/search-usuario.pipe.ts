import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchUsuario'
})
export class SearchUsuarioPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    if (!value) return null;
    if (!args) return value;

    args = args.toLowerCase();

    return value.filter(function (item) {

      let cadena;

      if (item.type == 0) {
        cadena = 'Usuario de oficina';    
      }

      if (item.type == 1) {
        cadena = 'Administrador de almacén';
      }

      if (item.type == 9) {
        cadena = 'Super-usuario';
      }
      cadena += ' ' + item.name + ' ' + item.username;
        return cadena.toLowerCase().includes(args);
    });
  }

}

