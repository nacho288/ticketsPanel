import { Component, OnInit } from '@angular/core';
import { DataService } from './../../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from './../../services/utils.service';
import { ConectionsService } from 'src/app/services/conections.service';



@Component({
  selector: 'app-pedido-usuario',
  templateUrl: './pedido-usuario.component.html',
  providers: [DataService, UtilsService]
})
export class PedidoUsuarioComponent implements OnInit {

  idRegistro;
  registro;
  

  constructor(
    private data: DataService, 
    private activatedRoute: ActivatedRoute, 
    public utils: UtilsService,
    private conections: ConectionsService,
    
    ) {

    this.activatedRoute.params.subscribe((params) => {
      this.idRegistro = params.id;
    });

    console.log("wii");
    

    this.conections.getPedidos();

   }

  ngOnInit() {
    this.registro = this.data.getDetallesRegistro(this.idRegistro);
    
  }

}
