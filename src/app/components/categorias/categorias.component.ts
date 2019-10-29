import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { ConectionsService } from 'src/app/services/conections.service';
import { CategoriasDataService } from 'src/app/services/categorias-data.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
})
export class CategoriasComponent implements OnInit {

  nombreCrearCat;
  nombreEditarCat;
  idEditarCat;
  nombreCrearSub;
  nombreEditarSub;
  idEditarSub;

  constructor(
    private conections: ConectionsService,
    public categoriasData: CategoriasDataService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.conections.getCategorias();
    this.categoriasData.ventana = 1;
  }

  crearCategoria = () => {

    if (!this.nombreCrearCat) {
      this.toastr.error('no se ha insertado ningun nombre', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right'
      });
      return;
    }

    this.conections.sendCategoria(this.nombreCrearCat);
    this.nombreCrearCat = "";
  }

  editarCategoria = () => {

    if (!this.nombreEditarCat) {
      this.toastr.error('no se ha insertado ningun nombre', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right'
      });
      return;
    }

    this.conections.updateCategoria(this.nombreEditarCat, this.idEditarCat);
  }

  toEditarCat = (nombre, id) => {
    this.nombreEditarCat = nombre;
    this.idEditarCat = id;
  }

  limpiarSub = () => {
    this.nombreCrearSub = "";
  }

  crearSub = (id) => {

    if (!this.nombreCrearSub) {
      this.toastr.error('no se ha insertado ningun nombre', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right'
      });
      return;
    }

    this.conections.sendSubcategoria(this.nombreCrearSub, id);
    this.nombreCrearSub = "";
  }



}
