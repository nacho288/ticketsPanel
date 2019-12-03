import { Component, OnInit } from '@angular/core';
import { ConectionsService } from 'src/app/services/conections.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-utilidades',
  templateUrl: './utilidades.component.html'
})
export class UtilidadesComponent implements OnInit {

  constructor(public conections: ConectionsService, public utils: UtilsService) {
    this.conections.kickToHome(0);
    this.conections.kickToHome(1);
   }
   
  formatearCodigos = () => {
    this.conections.formatearCodigos();
  }

  ngOnInit() {
  }

}
