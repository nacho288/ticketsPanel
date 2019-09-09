import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriasDataService {

  categorias: any[] = [];

  categoria;

  ventana = 1;

  loading: boolean = false;

  constructor() { }
}
