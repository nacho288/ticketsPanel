import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InsumosDataService {

  insumos: any[] = [];

  insumo;

  loading: boolean = true;

  constructor() { }
}
