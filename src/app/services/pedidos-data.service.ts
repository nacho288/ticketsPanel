import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PedidosDataService {

  pedidos: any[] = [];

  pedidosFiltrados: any[] = [];

  pedido;

  ventana = 1;

  loading: boolean = true;

  constructor() { }
}
