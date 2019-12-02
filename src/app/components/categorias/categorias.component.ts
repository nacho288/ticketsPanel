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
  catSubId;

  productosSub: any;

  p: number = 1;
  p2: number = 1;
  p3: number = 1;
  buscar: string = "";
  buscarSub: string = "";

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

  editarSub = () => {

    if (!this.nombreEditarSub) {
      this.toastr.error('no se ha insertado ningun nombre', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right'
      });
      return;
    }

    this.conections.updateSub(this.nombreEditarSub, this.idEditarSub);
  }


  toEditarCat = (nombre, id) => {
    this.nombreEditarCat = nombre;
    this.idEditarCat = id;
  }

  toEditarSub = (nombre, id) => {
    this.nombreEditarSub = nombre;
    this.idEditarSub = id;
  }

  toSub = (id) => {
    let inde = this.categoriasData.categorias.findIndex(item => item.id == id);
    this.catSubId = inde;
    this.categoriasData.ventana = 2;
  }

  toBienes = (sub) => {
    this.productosSub = sub;
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

  eliminarCategoria = (id) => {
    this.conections.deleteCategoria(id);
  }

  eliminarSubcategoria = (id) => {
    this.conections.deleteSubcategoria(id);
  }

  errorCategoaria = () => {
    this.toastr.error('no se puede eliminar una categoria con subcategorias asignadas', 'Error', {
      timeOut: 3000,
      positionClass: 'toast-bottom-right'
    });
  }

  errorSub = () => {
    this.toastr.error('no se puede eliminar una subcategoria con bienes asignados', 'Error', {
      timeOut: 3000,
      positionClass: 'toast-bottom-right'
    });
  }

  volver = () => {
    this.conections.getCategorias();
    this.categoriasData.ventana = 1;
  }

}
