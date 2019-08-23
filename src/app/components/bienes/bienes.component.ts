import { Component, OnInit } from '@angular/core';
import { InsumosDataService } from 'src/app/services/insumos-data.service';
import { ConectionsService } from 'src/app/services/conections.service';

@Component({
  selector: 'app-bienes',
  templateUrl: './bienes.component.html',
  styleUrls: ['./bienes.component.css']
})
export class BienesComponent implements OnInit {

  constructor(private conections: ConectionsService,public insumosData: InsumosDataService) { }

  ngOnInit() {
    this.conections.getProducts();
    
  }

  eliminar =  (id) => {
    this.conections.deleteProduct(id)
  }

}
