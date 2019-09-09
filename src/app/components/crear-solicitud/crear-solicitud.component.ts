import { Component, OnInit } from '@angular/core';
import { ConectionsService } from './../../services/conections.service';
import { InsumosDataService } from './../../services/insumos-data.service';
import { Router } from '@angular/router';

import { SolicitudDataService } from './../../services/solicitud-data.service';

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

  constructor(
    private conections: ConectionsService, 
    public insumosData: InsumosDataService,
    public solicitud: SolicitudDataService, 
    private router : Router) { 
    this.solicitud.ventana = 1;
    this.conections.getProductsUser();
    this.conections.getCategorias();
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
    }
  }

  quitar = (id) => {
    this.solicitud.solicitud.insumos = this.solicitud.solicitud.insumos.filter(p => p.id != id);
  }

  enviar = () => {

    if (this.solicitud.solicitud.insumos.length != 0) {
      this.solicitud.solicitud.comentarioUsuario = this.comentario ? this.comentario : "";
      this.conections.sendPedido();  
    } else {
      this.errorVacio = true;
    }
    
  }

  volver = () => {
    this.solicitud.reset();
    this.comentario = "";
    this.conections.getProductsUser();
  }


/*   agrupar = () => {
    
    let categorias = [];

    this.insumosData.insumos.forEach(insumo => {
      
      let catId = insumo.subcategoria.categoria.id;
      let subId = insumo.categoria.id;

    });

    


  } */
  
  

}
