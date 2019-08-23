import { Injectable } from '@angular/core';
import { ConectionsService } from './conections.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {



  constructor(public conections: ConectionsService) { }

/*   changeLogin = () => this.logged = this.logged ? false : true; */
  
  login = (username, password) => {
    this.conections.login(username, password);
  }

  logOut = () => {
    this.conections.logOut();
  };



}
