import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  parseDate = (date) => {
    return date.getDate() + "/" + date.getMonth() + "/" +  date.getFullYear() 
  };

  estados = [
    {
      id: 0,
      nombre: "pendiente",
      color: "text-secondary"
    },
    {
      id: 1,
      nombre: "aprobado",
      color: "text-primary"
    },
    {
      id: 2,
      nombre: "en proceso",
      color: "text-warning"
    },
    {
      id: 3,
      nombre: "finalizado",
      color: "text-success"
    },
    {
      id: 4,
      nombre: "rechazado",
      color: "text-danger"
    },
  ];

  getColor = (id) => this.estados.find(e => e.id == id).color;
  getEstado = (id) => this.estados.find(e => e.id == id).nombre;
  
  

  constructor() { }
}

