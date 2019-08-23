import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginDataService {

  logged: Boolean = true;
  type: number = 0;
  error: number = 2;
  loading: boolean = false;
  fullName: string = "Ignacio Nazzo";

  constructor() { }
}
