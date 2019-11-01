import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  parseDate = (date) => {

    let ano = date.substring(0, 4);
    let mes = date.substring(5, 7);
    let dia = date.substring(8, 10);

    return dia + '/' + mes + '/' + ano;
  };

  estados = [
    {
      id: 0,
      nombre: "pendiente",
      color: "text-dark"
    },
    {
      id: 1,
      nombre: "aprobado",
      color: "text-dark"
    },
    {
      id: 2,
      nombre: "en proceso",
      color: "text-dark"
    },
    {
      id: 3,
      nombre: "entregado",
      color: "text-dark"
    },
    {
      id: 4,
      nombre: "cancelado",
      color: "text-dark"
    },
    {
      id: 5,
      nombre: "aprobado parcial",
      color: "text-dark"
    }
  ];

  estadosProducto = [
    {
      id: 0,
      nombre: "pendiente",
      color: "text-dark"
    },
    {
      id: 1,
      nombre: "aprobado",
      color: "text-dark"
    },
    {
      id: 2,
      nombre: "rechazado",
      color: "text-dark"
    }
  ];

  getColor = (id) => this.estados.find(e => e.id == id).color;
  getEstado = (id) => this.estados.find(e => e.id == id).nombre;
  getEstadoProducto = (id) => this.estadosProducto.find(e => e.id == id).nombre;
  getColorProducto = (id) => this.estadosProducto.find(e => e.id == id).color;
  
  constructor() { }
}

