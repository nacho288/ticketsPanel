import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

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
  oficinaAgregarId = null;
  adminAgregarId = null;
  almacenId;

  AlmacenOficinasId: any = null;
  AlmacenAdminsId: any = null;

  editarPack = {
    id: 0,
    nombre: ""
  }

  constructor(
    private conections: ConectionsService,
    public almacenes: AlmacenesDataService,
    public usuarios: UsuariosDataService,
    public oficinas: OficinasDataService,
    private toastr: ToastrService 
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

    if (!this.nombreCrear) {
      this.toastr.error('no se ha insertado ningun nombre', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right'
      });
      return;
    }

    this.conections.sendAlmacen(this.nombreCrear);
  }

  toEditar = (almacen) => {
    this.editarPack = {
      id: almacen.id,
      nombre: almacen.nombre
    }
  }

  toOficinas = (id) => {
    this.AlmacenOficinasId = id;
    this.filtrarOficinas(this.almacenes.almacenes[id]);
  }

  toAdmins = (id) => {
    this.AlmacenAdminsId = id;
    this.filtrarAdmins(this.almacenes.almacenes[id]);
  }

  cambiarNombre = () => {
    if (!this.editarPack.nombre) {
      this.toastr.error('no se ha insertado ningun nombre', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right'
      });
      return;
    }

    this.conections.cambiarNombreAlmacen(this.editarPack.id, this.editarPack.nombre);
  }

  agregarOficina =  () => {

    if (!this.oficinaAgregarId) {
      this.toastr.error('no se ha seleccionado ninguna oficina', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right'
      });
      return;
    }

    if (this.oficinaAgregarId && this.almacenId) {
      this.conections.insertOficinaAlmacen(this.almacenId, this.oficinaAgregarId);
    }

    this.oficinaAgregarId = null;
  }

  quitarOficina = (alId, ofId) => {
    this.conections.quitarOficinaAlmacen(alId, ofId);
  }

  agregarAdmin = () => {

    if (!this.adminAgregarId) {
      this.toastr.error('no se ha seleccionado ningún almacén', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right'
      });
      return;
    }

    if (this.adminAgregarId && this.almacenId) {
      this.conections.insertAdminAlmacen(this.almacenId, this.adminAgregarId);
    }

    this.adminAgregarId = null;
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
