import { Component, OnInit } from '@angular/core';
import { InsumosDataService } from 'src/app/services/insumos-data.service';
import { ConectionsService } from 'src/app/services/conections.service';
import { UsuariosDataService } from './../../services/usuarios-data.service';

@Component({
  selector: 'app-bienes',
  templateUrl: './bienes.component.html',
  styleUrls: ['./bienes.component.css']
})
export class BienesComponent implements OnInit {

  nombre;
  minimo;
  maximo;
  stock;
  alerta;
  codigo;

  insumoEdit ={
    id: 0,
    nombre: "",
    minimo: 0,
    maximo: 0,
    codigo: 0,
    stock: 0,
    alerta: 0,
  };

  tratoEnviar = {
    usuario_id: 0,
    minimo: 0,
    maximo: 0,
  };

  insumoStock: {
    id: 0,
    nombre: "",
    minimo: 0,
    maximo: 0,
    codigo: 0,
    stock: 0
  };


  constructor(
    private conections: ConectionsService ,
    public insumosData: InsumosDataService,
    public usuarios: UsuariosDataService) {
    this.insumoStock = {
      id: 0,
      nombre: "",
      minimo: 0,
      maximo: 0,
      codigo: 0,
      stock: 0
  };
     }

  ngOnInit() {
    this.conections.getProducts();
    this.insumosData.ventana = 1;
  }

  cambioVentana = (id) => {
    this.insumosData.ventana = id;
  }

  eliminar = (id) => {
    this.conections.deleteProduct(id)
  }

  enviar = () => {

    if (this.nombre && this.codigo && this.maximo) {

      let pack = {
        nombre: this.nombre,
        minimo: this.minimo ? this.minimo : 0,
        maximo: this.maximo,
        stock: this.stock,
        alerta: this.alerta,
        codigo: this.codigo,
      };
  
      this.conections.sendProduct(pack);
    }

  }

  toEditar = (id) => {
    this.cambioVentana(3);
    let insumo = this.insumosData.insumos.find( item => item.id == id);
    this.insumoEdit = insumo;
  }

  toStock = (id) => {
    let insumo = this.insumosData.insumos.find(item => item.id == id);
    this.insumoStock = {
      ...insumo
    };
  }

  editar = (id) => {
    this.conections.updateProduct(this.insumoEdit);
  }

  toDetalles = (id) => {
    this.cambioVentana(4);
    this.conections.getUsuarios();
    this.conections.getProduct(id);
  }

  enviarTrato = () => {
    if (this.tratoEnviar.usuario_id) {
      this.conections.sendTrato(this.tratoEnviar);
      this.conections.getUsuarios();
    }
  }

  borrarTrato = (id) => {
    this.conections.deleteTrato(id);
  }

  updateStock = () => {
    this.conections.updateProductStock(this.insumoStock);
  }
  


}
