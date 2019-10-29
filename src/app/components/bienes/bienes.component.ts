import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { InsumosDataService } from 'src/app/services/insumos-data.service';
import { ConectionsService } from 'src/app/services/conections.service';
import { UsuariosDataService } from './../../services/usuarios-data.service';
import { FormControl} from '@angular/forms';
import { CategoriasDataService } from 'src/app/services/categorias-data.service';
import { OficinasDataService } from './../../services/oficinas-data.service';
import { LoginDataService } from 'src/app/services/login-data.service';
import { UtilsService } from 'src/app/services/utils.service';



@Component({
  selector: 'app-bienes',
  templateUrl: './bienes.component.html'
})
export class BienesComponent implements OnInit {

  control = new FormControl();

  nombre;
  minimo;
  maximo;
  stock;
  alerta;
/*   codigo; */
  frecuencia;
  preparacion;
  subCategoria: any = null;

  comentarioStock = "";

  insumoEdit ={
    id: 0,
    nombre: <string> "",
    minimo: <number> 0,
    maximo: <number> 0,
    codigo: <string> "",
    stock: <number> 0,
    alerta: <number> 0,
    subcategoria_id: <number> null,
    frecuencia: <number> 0,
    preparacion: <number> 0
  };

  tratoEnviar = {
    oficina_id: null,
    minimo: 0,
    maximo: 0,
  };

  insumoStock: {
    id: 0,
    nombre: "",
    minimo: 0,
    maximo: 0,
    codigo: 0,
    stock: 0,
    comentario: ''
  };


  constructor(
    private conections: ConectionsService ,
    public utils: UtilsService,
    public insumosData: InsumosDataService,
    public categoriasData: CategoriasDataService,
    public usuarios: UsuariosDataService,
    public oficinas: OficinasDataService,
    public loginData: LoginDataService,
    private toastr: ToastrService) {
    this.conections.kickToHome(0);
    this.conections.kickToHome(9);
    this.insumoStock = {
      id: 0,
      nombre: "",
      minimo: 0,
      maximo: 0,
      codigo: 0,
      stock: 0,
      comentario: ''
      };
     }

  ngOnInit() {
    this.conections.getProducts();
    this.insumosData.ventana = 1;
  }

  cambioVentana = (id) => {

    if (id == 1) {
      this.conections.getProducts();
    }

    this.insumosData.ventana = id;
  }

  eliminar = (id) => {
    this.conections.deleteProduct(id)
  }

  enviar = () => {

    if (!this.nombre) {
      this.toastr.error('no se ha insertado ningun nombre', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right'
      });
      return;
    }

    if (!Number.isInteger(this.maximo)) {
      this.toastr.error('no se ha insertado un máximo en rango válido', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right'
      });
      return;
    }

    if (!Number.isInteger(this.frecuencia)) {
      this.toastr.error('no se ha insertado una frecuencia de pedido válida', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right'
      });
      return;
    }

    if (!Number.isInteger(this.preparacion)) {
      this.toastr.error('no se ha insertado un tiempo de preparación válido', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right'
      });
      return;
    }

    if (!this.subCategoria) {
      this.toastr.error('no se ha seleccionado ninguna categoria', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right'
      });
      return;
    }

    if (!Number.isInteger(this.minimo)) {
      this.toastr.error('no se ha insertado un mínimo por pedido válido', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right'
      });
      return;
    }

    if (!Number.isInteger(this.stock)) {
      this.toastr.error('no se ha insertado una cantidad de stock válida', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right'
      });
      return;
    }

    if (!Number.isInteger(this.alerta)) {
      this.toastr.error('no se ha insertado una cantidad mínima por stock valida', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right'
      });
      return;
    }

    let pack = {
      nombre: this.nombre,
      minimo: this.minimo ? this.minimo : 0,
      maximo: this.maximo,
      stock: this.stock,
      alerta: this.alerta,
      frecuencia: this.frecuencia,
      preparacion: this.preparacion,
      subcategoria_id: parseInt(this.subCategoria)
    };

    console.log(pack);
    
    this.conections.sendProduct(pack);

    this.nombre = "";
    this.minimo = null;
    this.maximo = null;
    this.stock = null;
    this.alerta = null;
    this.subCategoria = null;
    this.frecuencia = null;
    this.preparacion = null;

  }

  toCrear = () => {
    this.conections.getCategorias();
    this.cambioVentana(2);
  }

  toEditar = (id) => {
    this.conections.getCategorias();
    console.log(this.insumosData.insumo);
    this.insumoEdit = this.insumosData.insumo;

    this.insumoEdit = {
      id: parseInt(this.insumosData.insumo.id),
      nombre: this.insumosData.insumo.nombre,
      minimo: parseInt(this.insumosData.insumo.minimo),
      maximo: parseInt(this.insumosData.insumo.maximo),
      codigo: this.insumosData.insumo.codigo,
      stock: parseInt(this.insumosData.insumo.stock),
      alerta: parseInt(this.insumosData.insumo.alerta),
      subcategoria_id: parseInt(this.insumosData.insumo.subcategoria_id),
      frecuencia: parseInt(this.insumosData.insumo.frecuencia),
      preparacion: parseInt(this.insumosData.insumo.preparacion)
    };
    this.cambioVentana(3);
    /* let insumo = this.insumosData.insumos.find( item => item.id == id); */
    
  }

  toStock = (id) => {
    let insumo = this.insumosData.insumos.find(item => item.id == id);
    this.insumoStock = {
      ...insumo
    };
  }

  editar = () => {

    if (!this.insumoEdit.nombre) {
      this.toastr.error('no se ha insertado ningun nombre', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right'
      });
      return;
    }

    if (!Number.isInteger(this.insumoEdit.maximo)) {
      this.toastr.error('no se ha insertado un máximo en rango válido', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right'
      });
      return;
    }

    if (!Number.isInteger(this.insumoEdit.frecuencia)) {
      this.toastr.error('no se ha insertado una frecuencia de pedido válida', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right'
      });
      return;
    }

    if (!Number.isInteger(this.insumoEdit.preparacion)) {
      this.toastr.error('no se ha insertado un tiempo de preparación válido', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right'
      });
      return;
    }

    if (!this.insumoEdit.subcategoria_id) {
      this.toastr.error('no se ha seleccionado ninguna categoria', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right'
      });
      return;
    }

    if (!Number.isInteger(this.insumoEdit.minimo)) {
      this.toastr.error('no se ha insertado un mínimo por pedido válido', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right'
      });
      return;
    }

    if (!Number.isInteger(this.insumoEdit.alerta)) {
      this.toastr.error('no se ha insertado una cantidad mínima por stock valida', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right'
      });
      return;
    }

    this.conections.updateProduct(this.insumoEdit);
  }

  toDetalles = (id) => {
    this.conections.getAlmacen();
    this.conections.getOficinas();
    this.conections.getProduct(id);
    this.cambioVentana(4);
  }

  enviarTrato = () => {
    if (!this.tratoEnviar.oficina_id) {
      this.toastr.error('no se ha seleccionado ninguna oficina', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right'
      });
      return;
    }

    if (!Number.isInteger(this.tratoEnviar.maximo)) {
      this.toastr.error('no se ha insertado un número máximo válido', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right'
      });
      return;
    }

    if (!Number.isInteger(this.tratoEnviar.minimo)) {
      this.toastr.error('no se ha insertado un número minimo válido', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right'
      });
      return;
    }

    this.conections.sendTrato(this.tratoEnviar);
    this.conections.getOficinas();
  }

  borrarTrato = (id) => {
    this.conections.deleteTrato(id);
  }

  updateStock = () => {

    if (!Number.isInteger(this.insumoStock.stock)) {
      this.toastr.error('no se ha insertado una cantidad de stock válida', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right'
      });
      return;
    }

    this.conections.updateProductStock(this.insumoStock.stock, this.insumoStock.comentario, this.insumoStock.id);
  }

  toComentarioStock = (i) => {
    this.comentarioStock = this.insumosData.insumo.movimientos[i].comentario;
  }
  
  
}
