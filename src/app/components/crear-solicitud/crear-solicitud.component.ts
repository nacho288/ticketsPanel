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

  insumoId;
  cantidad;
  comentario;


  pedido = {
    insumos: [],
    comentarioUsuario: "",
  };


  constructor(private conections: ConectionsService, public insumosData: InsumosDataService,private solicitud: SolicitudDataService, private router : Router) { }

  ngOnInit() {
    this.conections.getProducts();
  }

  agregar = () => {
    if (this.insumoId && this.cantidad) {
      let repetido = this.pedido.insumos.findIndex(p => p.id == this.insumoId);
      if (repetido != (-1)) {
        this.pedido[repetido].cantidad += this.cantidad;
      } else {
        this.pedido.insumos.push({
          id: this.insumoId,
          nombre: this.insumosData.insumos.find(i => i.id == this.insumoId).nombre,
          cantidad: this.cantidad
        });  
      }
    }
  }

  quitar = (id) => {
    this.pedido.insumos = this.pedido.insumos.filter(p => p.id != id);
  }

  enviar = () => {
    this.pedido.comentarioUsuario = this.comentario;
    this.solicitud.solicitud = this.pedido;
    this.router.navigate(['/evaluar']);
  }
  
  

}
