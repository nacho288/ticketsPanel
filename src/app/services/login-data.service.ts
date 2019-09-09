import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginDataService {

  logged: Boolean = false;
  type: number = 0;
  id: number = null;
  error: number = 2;
  loading: boolean = false;
  fullName: string = "";

/*   logged: Boolean = true;
  type: number = 0;
  id: number = 1;
  error: number = 2;
  loading: boolean = false;
  fullName: string = "sdfsdfsd";
 */
  constructor() { }
}
