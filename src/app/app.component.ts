import { Component, ViewEncapsulation } from '@angular/core';
import { LoginDataService } from './services/login-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'ticket';

  constructor(public loginData: LoginDataService){

  }


}
