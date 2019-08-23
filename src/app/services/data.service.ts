import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  /* 
  0: por aprobar,
  1: aprobado,
  2: en proceso,
  3: finalizado,
  4: rechazado
  */

  registrosPropios = [
    {
      id: 0,
      estado: 2,
      fecha: 321,
      aprovadoPor: "",
    },
  ];

  registros = [
    {
      id:0,
      usuario: {
        id: 0,
        nombre: "Pepin"
      },
      estado: 0,
      fechas: {
        creado: new Date(2019, 1, 20),
        terminado: new Date(2019, 1, 24),
      },
      productos: [
        {
          id: "0",
          nombre: "yerba mate",
          cantidad: 3,
        },
        {
          id: "1",
          nombre: "papel",
          cantidad: 4,
        },
        {
          id: "2",
          nombre: "tinta negra impresora hp",
          cantidad: 5,
        }
      ],
      comentarioUsuario: "aoaoioijjjjjjjjjjj iwjefoaiwejf o aowiejfpaowiej apowiejfaoifjaosdoiue dlfofnpidjfn dfigdf oiojirweoi doisdoiwe woweoi iwei",
      comentarioAdmin: "oaoioijjjjjjjjjjj iwjefoaiwejf o aowiejfpaowiej apowiejfaoifjaosdoiue dlfofnpidjfn dfigdf oiojirweoi doisdoiwe wo",
    },
    {
      id: 1,
      usuario: {
        id: 0,
        nombre: "Pepin Pepito"
      },
      estado: 1,
      aprobadoPor: {
        id: 3,
        nombre: "tete tarolas"
      },
      fechas: {
        creado: new Date(2019, 3, 23),
        terminado: new Date(2019, 3, 24),
      },
      productos: [],
    },
    {
      id: 2,
      usuario: {
        id: 0,
        nombre: "Pepin"
      },
      estado: 2,
      fechas: {
        creado: new Date(2019, 4, 22),
        terminado: new Date(2019, 4, 24),
      },

      productos: [],
    },
    {
      id: 3,
      usuario: {
        id: 0,
        nombre: "Pepin"
      },
      estado: 3,
      fechas: {
        creado: new Date(2019, 4, 2),
        terminado: new Date(2019, 4, 4),
      },
      
      productos: [],
    },
    {
      id: 4,
      usuario: {
        id: 0,
        nombre: "Pepin"
      },
      estado: 4,
      fechas: {
        creado: new Date(2019, 4, 22),
        terminado: new Date(2019, 4, 24),
      },

      productos: [],
    },
  ];

  getMisTickets = (usuarioId: number) => {
    let registrosFiltrados = [];
    
    this.registros.map(r => {
      if (r.usuario.id === usuarioId) {
        registrosFiltrados.push(
          {
            id: r.id,
            nombre: r.usuario.nombre,
            estado: r.estado,
            fecha: r.fechas.creado,
            aprovadoPor: r.aprobadoPor ? r.aprobadoPor.nombre : "",
          }
        )
      };
    });
    
    return registrosFiltrados;

  };

  getDetallesRegistro = (registroId: number) => {
    return this.registros.find(r => registroId == r.id);
  };


  constructor() { }
}
