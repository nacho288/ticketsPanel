import { Component, OnInit } from '@angular/core';
import { ConectionsService } from './../../services/conections.service';
import { InsumosDataService } from './../../services/insumos-data.service';
import { CategoriasDataService } from './../../services/categorias-data.service';
import { Router } from '@angular/router';

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

  constructor(
    private conections: ConectionsService, 
    public insumosData: InsumosDataService,
    public solicitud: SolicitudDataService, 
    public categoriasData: CategoriasDataService,
    public loginData: LoginDataService,
    private router : Router) {
    this.conections.kickToHome(1);
    this.conections.kickToHome(9);

    if (this.loginData.almacen_id) {
      this.conections.getProducts();
      this.conections.getCategorias();
      this.solicitud.ventana = 1;
    } else {
      console.log('te chache');
      this.solicitud.ventana = 3
    }

    }

  ngOnInit() {
    
  }

  agregar = () => {
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

    if (this.solicitud.solicitud.insumos.length != 0) {
      this.solicitud.solicitud.comentarioUsuario = this.comentario ? this.comentario : "";
      this.conections.sendPedido();
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

  aElegir = () => {
    this.solicitud.ventana = 3;
    this.solicitud.limpiar();
  }
  

}
