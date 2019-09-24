import { Component, OnInit } from '@angular/core';
import { DataService } from './../../services/data.service';
import { UtilsService } from './../../services/utils.service';
import { ConectionsService } from './../../services/conections.service';
import { PedidosDataService } from './../../services/pedidos-data.service';
import { LoginDataService } from './../../services/login-data.service';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  providers: [DataService, UtilsService]
})
export class SolicitudesComponent implements OnInit {
  
  idBusqueda: number;
  fechaDesde; 
  fechaHasta;
  estadoBusqueda: number
  comentario;
  toEstado = 0;

  packEvaluar: any[] = [];

  constructor(
    private data: DataService, 
    public utils: UtilsService,
    private conections: ConectionsService,
    public pedidos: PedidosDataService,
    public login: LoginDataService
) { 
    this.conections.kickToHome(9);
  }

  limpiar = () => {
    this.pedidos.pedidosFiltrados = this.pedidos.pedidos;
    this.idBusqueda = undefined;
    this.fechaDesde = undefined;
    this.fechaHasta = undefined;
    this.estadoBusqueda = undefined;
  };

  filtrar = () =>{
    let resultado = this.pedidos.pedidos
    resultado = this.idBusqueda ? resultado.filter(r => r.pedido_id == this.idBusqueda) : resultado;
    resultado = this.fechaDesde ? resultado.filter(r => this.formatearFecha(r.fecha).getTime() >= this.formatearFecha(this.fechaDesde).getTime()) : resultado;
    resultado = this.fechaHasta ? resultado.filter(r => this.formatearFecha(r.fecha).getTime() <= this.formatearFecha(this.fechaHasta).getTime()) : resultado;
    
    resultado = this.estadoBusqueda ? resultado.filter(r => r.estado == this.estadoBusqueda) : resultado;
    this.pedidos.pedidosFiltrados = resultado;
  }
  
  formatearFecha = (cadena: string) => {
    return new Date(
      parseInt(cadena.substring(0, 4)), 
      parseInt(cadena.substring(5, 7)),
      parseInt(cadena.substring(8, 10)
    ));
  }

  detalles = (id) => {
    this.conections.getPedido(id);
    this.comentario = "";
    this.pedidos.ventana = 2;
  }

  volver= () => {
    this.pedidos.ventana = 1
    this.comentario = "";
    this.conections.getPedidos();
  }

  update = () => {
    this.conections.updatePedido(this.toEstado, this.comentario);
  }

  updateEvaluar = () => {
    this.pedidos.packAprobado = this.packEvaluar;
    this.conections.updatePedido(1, this.comentario);
  }
  
  toEvaluar = () => {

    this.packEvaluar = [];

    this.pedidos.pedido.productos.forEach(pro => {
      this.packEvaluar.push({
        ...pro,
        aprobado: false
      })
    });

    console.log(this.packEvaluar);

  }
  

  ngOnInit() {
    this.conections.getPedidos();
    this.pedidos.ventana = 1
  }

}
