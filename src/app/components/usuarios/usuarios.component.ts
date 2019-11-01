import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { UsuariosDataService } from 'src/app/services/usuarios-data.service';
import { LoginDataService } from 'src/app/services/login-data.service';
import { ConectionsService } from 'src/app/services/conections.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  nuevoUsuario = {
    name: null,
    email: null,
    password: null,
    password_confirmation: null,
    username: null,
    type: null
  }

  constructor(
    private conections: ConectionsService,
    public usuarios: UsuariosDataService,
    public loginData: LoginDataService,
    private toastr: ToastrService 
  ) { 
    this.conections.kickToHome(0);
    this.conections.kickToHome(1);
  }

  ngOnInit() {
    this.conections.getUsuarios('all');
  }

  crearUsuario = () => {

    if (!this.nuevoUsuario.name) {
      this.toastr.error('no se ha insertado ningún nombre', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right'
      });
      return;
    }

    if (!this.nuevoUsuario.username) {
      this.toastr.error('no se ha insertado un nombre de usuario válido', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right'
      });
      return;
    }

    if (this.nuevoUsuario.type === null) {
      this.toastr.error('no se ha seleccionado ningún tipo de usuario', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right'
      });
      return;
    }

    if (!this.nuevoUsuario.password) {
      this.toastr.error('no se ha insertado ninguna contraseña', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right'
      });
      return;
    }

    if (this.nuevoUsuario.password != this.nuevoUsuario.password_confirmation ) {
      this.toastr.error('la confirmación de contraseña no es correcta', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right'
      });
      return;
    }

    this.conections.registrarUsuario(this.nuevoUsuario);

    this.nuevoUsuario = {
      name: null,
      email: null,
      password: null,
      password_confirmation: null,
      username: null,
      type: null
    }
    
  }
  

}
