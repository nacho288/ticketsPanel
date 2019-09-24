import { Component, OnInit } from '@angular/core';
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
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    type: null
  }

  constructor(
    private conections: ConectionsService,
    public usuarios: UsuariosDataService,
    public loginData: LoginDataService
  ) { 
    this.conections.kickToHome(0);
    this.conections.kickToHome(1);
  }

  ngOnInit() {
    this.conections.getUsuarios('all');
  }

  crearUsuario = () => {
    this.conections.registrarUsuario(this.nuevoUsuario);
  }
  

}
