import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InsumosDataService {

  insumos: any[] = [];

  insumo;

  ventana = 1;

  loading: boolean = true;

  alerta = false;

  insumosAlerta: any[] = [];

  constructor() { }
}
