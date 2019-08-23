import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoginService } from './../../services/login.service';
import { ConectionsService } from './../../services/conections.service';
import { LoginDataService } from './../../services/login-data.service';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
})
export class LoginScreenComponent implements OnInit {

  nombre: string;
  password: string;
  loading: boolean = false

  constructor(public login: LoginService, public conections: ConectionsService, public loginData :LoginDataService) { }

  ngOnInit() {
    
  }
  
  enviarLogin = () => {
    
    if (this.nombre && this.password) {
      this.loginData.loading = true;
      this.login.login(this.nombre, this.password);
      
    }
    
  }
  

}
