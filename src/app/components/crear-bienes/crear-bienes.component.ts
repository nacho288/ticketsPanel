import { Component, OnInit } from '@angular/core';
import { ConectionsService } from 'src/app/services/conections.service';

@Component({
  selector: 'app-crear-bienes',
  templateUrl: './crear-bienes.component.html',
  styleUrls: ['./crear-bienes.component.css']
})
export class CrearBienesComponent implements OnInit {

  loading
  nombre;
  minimo;
  maximo;
  codigo;

  constructor(private conections: ConectionsService) { }

  ngOnInit() {
  }

  enviar = () => {

    if (this.nombre && this.codigo) {
      this.loading = true
      this.conections.sendProduct({
        nombre: this.nombre,
        minimo: this.minimo ? this.minimo : 0,
        maximo: this.maximo ? this.maximo : 0,
        codigo: this.codigo,
      })
    }
    
  }
  

}
