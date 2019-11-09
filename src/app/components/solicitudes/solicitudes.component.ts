import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

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
  nuevaPreparacion = 0;
  user_id = null;
  packEntregar = {
    empleado_id: null,
    password: null,
    username: null
  }

  packEvaluar: any[] = [];

  p: number = 1;

  constructor(
    private data: DataService, 
    public utils: UtilsService,
    private conections: ConectionsService,
    public pedidos: PedidosDataService,
    public login: LoginDataService,
    private toastr: ToastrService
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

  updatePanel = () => {

    if (!this.packEntregar.empleado_id) {
      this.toastr.error('no se ha seleccionado ningun usuario que recive', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right'
      });
      return;
    }

    if (!this.packEntregar.username) {
      this.toastr.error('no se ha seleccionado ningun admistrador', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right'
      });
      return;
    }

    if (!this.packEntregar.password) {
      this.toastr.error('no se ha introducido una contraseña válida', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right'
      });
      return;
    }

    this.conections.updatePedidoPanel(this.packEntregar);
    
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

  casillaPreparacion = (cantidadDias) => {
    this.nuevaPreparacion = cantidadDias;
  };
  
  enviarPreparacion = () => {

    if (!Number.isInteger(this.nuevaPreparacion)) {
      this.toastr.error('no se introducido un tiempo de preparación válido', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right'
      });
      return;
    }

    this.conections.updatePreparacionPedido(this.nuevaPreparacion);
  }

  getUsersEntregar = (ofi_id) => {
    this.login.oficinaSolicitud = this.login.almacenLogin.oficinas.find((ofi) => {
      return ofi.id == ofi_id
    });
    console.log(this.login.oficinaSolicitud);
    
  }
  
  ngOnInit() {
    this.conections.getPedidos();
    this.pedidos.ventana = 1
  }

}
