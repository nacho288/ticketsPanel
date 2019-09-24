import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuariosDataService {

  usuarios = [];
  loading = false
  ventana = 1;

  getNombre = (id) => this.usuarios.find((u) => u.id == id).nombre;

  constructor() { }
}
