import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InsumosDataService {

  insumos: any[] = [];
  sinCategorias: any[] = [];

  categorias: any[] = [];

  insumo;

  ventana = 1;

  loading: boolean = false;

  alerta = false;

  insumosAlerta: any[] = [];

  constructor() { }
}
