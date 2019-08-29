import { Component, OnInit } from '@angular/core';
import { ConectionsService } from './../../services/conections.service';
import { InsumosDataService } from './../../services/insumos-data.service';
import { Router } from '@angular/router';
import { SolicitudDataService } from './../../services/solicitud-data.service';

@Component({
  selector: 'app-crear-solicitud',
  templateUrl: './crear-solicitud.component.html',
  styleUrls: ['./crear-solicitud.component.css']
})
export class CrearSolicitudComponent implements OnInit {

  ventana = 1;

  insumoId;
  cantidad;
  comentario;

  constructor(
    private conections: ConectionsService, 
    public insumosData: InsumosDataService,
    public solicitud: SolicitudDataService, 
    private router : Router) { }

  ngOnInit() {
    this.solicitud.ventana = 1;
    this.conections.getProductsUser();
  }

  agregar = () => {
    if (this.insumoId && this.cantidad) {
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
    }
  }

  quitar = (id) => {
    this.solicitud.solicitud.insumos = this.solicitud.solicitud.insumos.filter(p => p.id != id);
  }

  enviar = () => {

    if (this.solicitud.solicitud.insumos.length != 0) {
      this.solicitud.solicitud.comentarioUsuario = this.comentario ? this.comentario : "";
      this.conections.sendPedido();  
    }
    
  }

  volver = () => {
    this.solicitud.reset();
    this.comentario = "";
    this.conections.getProductsUser();
  }
  
}
