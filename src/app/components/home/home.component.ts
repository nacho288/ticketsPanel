import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoginDataService } from './../../services/login-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: ['body {background-color: white;}'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  constructor(public loginData : LoginDataService) { }

  ngOnInit() {
  }

}
