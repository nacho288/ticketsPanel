import { Component, OnInit } from '@angular/core';
import { InsumosDataService } from './../../services/insumos-data.service';
import { SolicitudDataService } from './../../services/solicitud-data.service';

@Component({
  selector: 'app-evaluar',
  templateUrl: './evaluar.component.html',
  styleUrls: ['./evaluar.component.css']
})
export class EvaluarComponent implements OnInit {

  constructor(private insumos: InsumosDataService, private solicitud: SolicitudDataService) { }

  ngOnInit() {
    console.log(this.solicitud.solicitud);
    
  }

}
