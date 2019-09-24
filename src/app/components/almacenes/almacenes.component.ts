import { Component, OnInit } from '@angular/core';
import { ConectionsService } from 'src/app/services/conections.service';
import { AlmacenesDataService } from './../../services/almacenes-data.service';
import { UsuariosDataService } from './../../services/usuarios-data.service';
import { OficinasDataService } from './../../services/oficinas-data.service';

@Component({
  selector: 'app-almacenes',
  templateUrl: './almacenes.component.html',
  styleUrls: ['./almacenes.component.scss']
})
export class AlmacenesComponent implements OnInit {

  nombreCrear: string = "";
  listaOficinas: any[] = [];
  listaAdmins: any[] = [];
  oficinaAgregarId;
  adminAgregarId;
  almacenId;

  editarPack = {
    id: 0,
    nombre: ""
  }

  constructor(
    private conections: ConectionsService,
    public almacenes: AlmacenesDataService,
    public usuarios: UsuariosDataService,
    public oficinas: OficinasDataService 
  ) {
    this.conections.kickToHome(0);
    this.conections.kickToHome(1);
   }

  ngOnInit() {
    this.conections.getAlmacenes();
    this.conections.getOficinas();
    this.conections.getUsuarios('admins');
  }
  
  crearAlmacen = () => {
    this.conections.sendAlmacen(this.nombreCrear);
  }

  toEditar = (almacen) => {
    this.editarPack = {
      id: almacen.id,
      nombre: almacen.nombre
    }
  }

  cambiarNombre = () => {
    this.conections.cambiarNombreAlmacen(this.editarPack.id, this.editarPack.nombre)
  }

  agregarOficina =  () => {
    if (this.oficinaAgregarId && this.almacenId) {
      console.log(this.oficinaAgregarId + " " + this.almacenId);
      this.conections.insertOficinaAlmacen(this.almacenId, this.oficinaAgregarId);
    }
  }

  quitarOficina = (alId, ofId) => {
    this.conections.quitarOficinaAlmacen(alId, ofId);
  }

  agregarAdmin = () => {
    if (this.adminAgregarId && this.almacenId) {
      this.conections.insertAdminAlmacen(this.almacenId, this.adminAgregarId);
    }
  }

  quitarAdmin = (alId, adId) => {
    this.conections.quitarAdminAlmacen(alId, adId);
  }

  filtrarOficinas = (almacen) => {
    this.almacenId = almacen.id;
    this.listaOficinas = this.oficinas.oficinas.filter( oficina => {
      if (almacen.oficinas.find(ofi => ofi.id == oficina.id)) {
      return false
      } else { return true}
    });
  }

  filtrarAdmins = (almacen) => {
    this.almacenId = almacen.id;
    this.listaAdmins = this.usuarios.usuarios.filter(usuario => {
      if (almacen.administradores.find(adm => adm.id == usuario.id) || usuario.type != 1) {
        return false
      } else { return true }
    });
  }
  

}
