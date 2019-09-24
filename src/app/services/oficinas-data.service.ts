import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OficinasDataService {

  oficinas: any[] = [];

  ventana = 1;

  loading: boolean = false;

  getNombre = (id) => this.oficinas.find((o) => o.id == id).nombre;

  constructor() { }
}
