import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoginDataService } from './../../../services/login-data.service';
import { ConectionsService } from 'src/app/services/conections.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  styles: ['body {background-color: white;}'],
  encapsulation: ViewEncapsulation.None
})
export class NavBarComponent implements OnInit {

  constructor(public loginData: LoginDataService, public conections: ConectionsService) { }

  ngOnInit() {
  }

  cambiar = () => {
    this.loginData.logged = false;
  }
  
}
