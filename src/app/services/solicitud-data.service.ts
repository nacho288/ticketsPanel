import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SolicitudDataService {

  solicitud = {
    insumos: [],
    comentarioUsuario: "",
  };

  aprobado = false;
  loading = false;
  ventana = 1;

  reset = () => {
    
    this.solicitud = {
      insumos: [],
      comentarioUsuario: "",
    };

    this.ventana = 1;

  }

  limpiar = () => {
    this.solicitud = {
      insumos: [],
      comentarioUsuario: "",
    };
  }
  

  constructor() { }
}
