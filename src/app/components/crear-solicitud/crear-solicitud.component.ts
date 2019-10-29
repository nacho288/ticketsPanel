import { Component, OnInit } from '@angular/core';
import { ConectionsService } from './../../services/conections.service';
import { InsumosDataService } from './../../services/insumos-data.service';
import { CategoriasDataService } from './../../services/categorias-data.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { SolicitudDataService } from './../../services/solicitud-data.service';
import { LoginDataService } from 'src/app/services/login-data.service';


@Component({
  selector: 'app-crear-solicitud',
  templateUrl: './crear-solicitud.component.html'
})
export class CrearSolicitudComponent implements OnInit {

  ventana = 1;

  insumoId;
  cantidad;
  comentario;
  errorVacio = false;
  categoria:any;
  almacen_id: any = null;
  oficina_id: any = null;
  user_id = null;

  constructor(
    private conections: ConectionsService, 
    public insumosData: InsumosDataService,
    public solicitud: SolicitudDataService, 
    public categoriasData: CategoriasDataService,
    public loginData: LoginDataService,
    private toastr: ToastrService) {
    this.conections.kickToHome(9);
    this.solicitud.limpiar();

    if (this.loginData.oficina_id) {
      this.conections.getProductsPanel();
      this.conections.getCategorias();
      this.solicitud.ventana = 1;
    } else {
      this.solicitud.ventana = 3
    }

    }

  ngOnInit() {
    
  }

  agregar = () => {

    if (!this.insumoId) {
      this.toastr.error('no se ha seleccionado ningun bien', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right'
      });
      return;
    }

    if (!this.cantidad) {
      this.toastr.error('no se ha asignado ninguna cantidad', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right'
      });
      return;
    }

    if (this.insumoId && this.cantidad) {
      this.errorVacio = false;
      let repetido = this.solicitud.solicitud.insumos.findIndex(p => p.id == this.insumoId);
      if (repetido != (-1)) {
        this.solicitud.solicitud.insumos[repetido].cantidad += this.cantidad;
      } else {
        let ins = this.insumosData.insumos.find(i => i.id == this.insumoId);

        this.solicitud.solicitud.insumos.push({
          id: this.insumoId,
          codigo: ins.codigo,
          nombre: this.insumosData.insumos.find(i => i.id == this.insumoId).nombre,
          cantidad: this.cantidad,
          minimo: ins.minimo,
          maximo: ins.maximo,
        });  
      }

      this.insumoId = undefined;
      this.cantidad = undefined;
      this.categoria = undefined;
    }
  }

  quitar = (id) => {
    this.solicitud.solicitud.insumos = this.solicitud.solicitud.insumos.filter(p => p.id != id);
  }

  enviar = () => {

    if (!this.user_id) {
      this.toastr.error('no se ha seleccionado ningun usuario', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right'
      });
      return;
    }

    if (this.solicitud.solicitud.insumos.length == 0) {
      this.toastr.error('no se ha agregado ningun item', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right'
      });
      return;
    }

    if (this.solicitud.solicitud.insumos.length != 0 && this.oficina_id) {
      this.solicitud.solicitud.comentarioUsuario = this.comentario ? this.comentario : "";
      this.conections.sendPedidoPanel(this.user_id);
      this.solicitud.limpiar();
    } else {
      this.errorVacio = true;
    }
    
  }

  volver = () => {
    this.solicitud.reset();
    this.comentario = "";
    this.conections.getProducts();
  }

  elegirAlmacen = () => {
    this.loginData.almacen_id = this.almacen_id;
    this.loginData.almacenSolicitud = this.loginData.oficinaLogin.almacenes.find((al) => {
      return al.id == this.loginData.almacen_id
    }).nombre; 
    this.conections.getProducts();
    this.conections.getCategorias();
    this.solicitud.ventana = 1;
  }

  elegirOficina = () => {

    if (!this.oficina_id) {
      this.toastr.error('Debe elegir una oficina', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right'
      });
    } else {

      this.loginData.oficina_id = this.oficina_id;
      this.loginData.oficinaSolicitud = this.loginData.almacenLogin.oficinas.find((ofi) => {
        return ofi.id == this.loginData.oficina_id
      });
      this.conections.getProductsPanel();
      this.conections.getCategorias();
      this.solicitud.ventana = 1;

    }
    
  }

  aElegir = () => {
    this.solicitud.ventana = 3;
    this.solicitud.limpiar();
  }
  

}
