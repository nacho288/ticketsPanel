import { Component, OnInit } from '@angular/core';
import { DataService } from './../../services/data.service';
import { UtilsService } from './../../services/utils.service';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css'],
  providers: [DataService, UtilsService]
})
export class SolicitudesComponent implements OnInit {
  
  registros: any[];
  registrosFiltrados: any[];

  idBusqueda: number;
  fechaDesde; 
  fechaHasta;
  estadoBusqueda: number

  constructor(private data: DataService, public utils: UtilsService) { 
    this.registros = this.data.getMisTickets(0);
  }

  limpiar = () => {
    this.registrosFiltrados = this.registros;
    this.idBusqueda = undefined;
    this.fechaDesde = undefined;
    this.fechaHasta = undefined;
    this.estadoBusqueda = undefined;
  };

  filtrar = () =>{
    let resultado = this.registros
    resultado = this.idBusqueda ? resultado.filter(r => r.id == this.idBusqueda) : resultado;
    resultado = this.fechaDesde ? resultado.filter(r => r.fecha.getTime() >= this.formatearFecha(this.fechaDesde).getTime()) : resultado;
    resultado = this.fechaHasta ? resultado.filter(r => r.fecha.getTime() <= this.formatearFecha(this.fechaHasta).getTime()) : resultado;
    console.log(this.estadoBusqueda);
    
    resultado = this.estadoBusqueda ? resultado.filter(r => r.estado == this.estadoBusqueda) : resultado;
    this.registrosFiltrados = resultado;
  }
  
  formatearFecha = (cadena: string) => {
    return new Date(
      parseInt(cadena.substring(0, 4)), 
      parseInt(cadena.substring(5, 7)),
      parseInt(cadena.substring(8, 10)
    ));
  }

  ngOnInit() {
    this.registrosFiltrados = this.registros;
  }

}
