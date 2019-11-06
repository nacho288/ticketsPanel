import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { ConectionsService } from 'src/app/services/conections.service';
import { UsuariosDataService } from 'src/app/services/usuarios-data.service';
import { OficinasDataService } from './../../services/oficinas-data.service';

@Component({
  selector: 'app-oficinas',
  templateUrl: './oficinas.component.html',
  styleUrls: ['./oficinas.component.scss']
})
export class OficinasComponent implements OnInit {

  nombreCrear: string = "";
  listaUsuarios: any[] = [];
  usuarioAgregarId = null;
  oficinaId;

  editarPack = {
    id: 0,
    nombre: ""
  }

  oficinaUsuariosId: any;

  constructor(
    private conections: ConectionsService,
    public usuarios: UsuariosDataService,
    public oficinas: OficinasDataService,
    private toastr: ToastrService  
  ) { 
    this.conections.kickToHome(1);
    this.conections.kickToHome(0);
  }

  ngOnInit() {
    this.conections.getOficinas();
    this.conections.getUsuarios('users');
  }

  crearOficina = () => {
    if (!this.nombreCrear) {
      this.toastr.error('no se ha insertado ningun nombre', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right'
      });
      return;
    }

    this.conections.sendOficina(this.nombreCrear);
  }

  toEditar = (oficina) => {
    this.editarPack = {
      id: oficina.id,
      nombre: oficina.nombre
    }
  }

  toUsuarios = (oficinaId) => {
    this.oficinaUsuariosId = oficinaId;
    this.filtrarUsuarios(this.oficinas.oficinas[this.oficinaUsuariosId]);
    console.log(this.oficinas.oficinas[this.oficinaUsuariosId].usuarios);
  }

  cambiarNombre = () => {
    if (!this.editarPack.nombre) {
      this.toastr.error('no se ha insertado ningun nombre', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right'
      });
      return;
    }

    this.conections.cambiarNombreOficina(this.editarPack.id, this.editarPack.nombre)
  }

  agregarUsuario = () => {

    if (!this.usuarioAgregarId) {
      this.toastr.error('no se ha seleccionado ningún usuario', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right'
      });
      return;
    }

    if (this.usuarioAgregarId && this.oficinaId) {
      this.conections.insertUsuarioOficina(this.oficinaId, this.usuarioAgregarId);
    }

    this.oficinaUsuariosId = null;
    this.usuarioAgregarId = null;
  }

  quitarUsuario = (ofId, usId) => {
    this.conections.quitarUsuarioOficina(ofId, usId);
  }

  filtrarUsuarios = (oficina) => {
    this.oficinaId = oficina.id;
    this.listaUsuarios = this.usuarios.usuarios.filter(usuario => {
      if (oficina.usuarios.find(usr => usr.id == usuario.id) || usuario.type != 0) {
        return false
      } else { return true }
    });
  }



}
