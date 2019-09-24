import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ConectionsService } from './../../services/conections.service';
import { LoginDataService } from './../../services/login-data.service';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
})
export class LoginScreenComponent implements OnInit {

  email: string;
  password: string;
  loading: boolean = false;
  almacen_id: any = null;
  oficina_id: any = null;

  constructor( public conections: ConectionsService, public loginData :LoginDataService) { 
    if (this.loginData.token) {
      console.log('recargando');
      this.conections.getUser();
      this.loginData.ventana = 2;
    }
  }

  ngOnInit() {
    
  }
  
  enviarLogin = () => {

    if (this.email && this.password) {
      this.conections.login(this.email, this.password);
    }
    
  }

  segundoPaso = () => {
    
    if (this.loginData.type == 0 && this.oficina_id) {
      this.loginData.oficinaLogin = this.loginData.userOficinas.find(ofi => ofi.id == this.oficina_id);
      this.loginData.oficina_id = this.loginData.oficinaLogin.id;
      this.loginData.logged = true;
      this.conections.toHome();
    }

    if (this.loginData.type == 1 && this.almacen_id) {
      this.loginData.almacenLogin = this.loginData.userAlmacenes.find(al => al.id == this.almacen_id);
      this.loginData.almacen_id = this.loginData.almacenLogin.id;
      this.loginData.logged = true;
      this.conections.toHome();
    }

  }
  
  

}
