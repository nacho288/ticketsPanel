import { Component, OnInit } from '@angular/core';
import { InsumosDataService } from 'src/app/services/insumos-data.service';
import { ConectionsService } from 'src/app/services/conections.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-editar-bienes',
  templateUrl: './editar-bienes.component.html',
})
export class EditarBienesComponent implements OnInit {

  loading = false;
  producto
  id
  nombre;
  minimo;
  maximo;


  constructor(private route: ActivatedRoute, private conections: ConectionsService, public insumosData: InsumosDataService) {
    this.id = this.route.snapshot.paramMap.get("id");
   }

  ngOnInit() {
    /* this.producto = this.conections.getProduct(this.id);
    this.nombre = this.producto.nombre;
    this.minimo = this.producto.minimo;
    this.maximo = this.producto.maximo; */
  }

  enviar = () => {

    if (this.producto.nombre && this.producto.id) {
      this.loading = true
    }

  }

}
