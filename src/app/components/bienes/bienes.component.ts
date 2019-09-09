import { Component, OnInit } from '@angular/core';
import { InsumosDataService } from 'src/app/services/insumos-data.service';
import { ConectionsService } from 'src/app/services/conections.service';
import { UsuariosDataService } from './../../services/usuarios-data.service';
import { FormControl} from '@angular/forms';
import { CategoriasDataService } from 'src/app/services/categorias-data.service';



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
  codigo;
  subCategoria: any = 1;

  insumoEdit ={
    id: 0,
    nombre: "",
    minimo: 0,
    maximo: 0,
    codigo: 0,
    stock: 0,
    alerta: 0,
    subcategoria_id: 0,
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
    public categoriasData: CategoriasDataService,
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
        subcategoria_id: parseInt(this.subCategoria),
      };

      console.log(pack);
      
      this.conections.sendProduct(pack);

      this.nombre = "";
      this.minimo = null;
      this.maximo = null;
      this.stock = null;
      this.alerta = null;
      this.codigo = "";
      this.subCategoria = 1;
    }

  }

  toCrear = () => {
    this.conections.getCategorias();
    this.cambioVentana(2);
  }

  toEditar = (id) => {
    this.cambioVentana(3);
    this.conections.getCategorias();
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
