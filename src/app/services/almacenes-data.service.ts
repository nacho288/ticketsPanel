import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlmacenesDataService {

  almacenes: any[] = [];

  ventana = 1;

  loading: boolean = false;

  constructor() { }
}
