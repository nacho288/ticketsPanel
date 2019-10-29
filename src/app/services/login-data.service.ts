import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginDataService {

  ventana = 1;

  logged: Boolean = false;
  type: number = 0;
  id: number = null;
  error: number = 2;
  loading: boolean = false;
  fullName: string = "";
  token: string;
  almacen_id: any;
  almacenSolicitud: any;
  oficinaSolicitud: any;
  oficina_id: any;
  userAlmacenes: any = [];
  userOficinas: any = [];
  almacenLogin: any;
  oficinaLogin: any;

  almacen: any;
  oficina: any;



 /*  logged: Boolean = true;
  type: number = 0;
  id: number = 1;
  error: number = 2;
  loading: boolean = false;
  fullName: string = "user1 1";
  token: string = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImI4NzAxMzZlZjFjZWZkZTNmNzA0MzIyZDRlNmJiNWQxZjdkMzM1MGRiMDgzNjM3ZDdhYWVlMWNkMDEzOTgyNWQxMjcwYTRkYmU3ZTZlNWYyIn0.eyJhdWQiOiIxIiwianRpIjoiYjg3MDEzNmVmMWNlZmRlM2Y3MDQzMjJkNGU2YmI1ZDFmN2QzMzUwZGIwODM2MzdkN2FhZWUxY2QwMTM5ODI1ZDEyNzBhNGRiZTdlNmU1ZjIiLCJpYXQiOjE1NjkzMjc3ODksIm5iZiI6MTU2OTMyNzc4OSwiZXhwIjoxNjAwOTUwMTg5LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.K8XFBblnHYxAJ_xQiQwx5dOGT5VIM_r7CU-OsmQr-YLA6SclSIKnNOY_r2UZ-yck4H-UioH16Fgr1uf-T1UEemGdv3v5A_Kje8OraJ57f5IyXEAiqKWUklD9Tg8Pt87faeFQII2v1OQLIy9powtPGf6rBOzNZBuhjG9FFwr1_FwRwyZSax0A7JF3eW7mYvdi-do6r5AsnsWsFSa-g2A9tnU-nTNyXuCwqP3C_s9K_APfoOJ286DNChHNJEKq4TqzL63jSR_IX3jrVBRStBRPbep_OySqGGrz3uoOcZXJPyGzQ4V6M-lE48qwSGpQk4Z59n913sXhLF_emQWTfJ2bImJCuwxwnVKUJsHWlzUgimDXkXiu14qxjuy5OpMbA4hbPPabrd-rspmRn5sKEmo3Jy2dV8nXs1EA_LO4UZRn-KEWN-ymgTr52t1m2X5ops-50_Jot-rNZ-8wAAmXayEm8Qp1VkqmeLgdeDd8o9Wy0WtSsH-GPx0oLQjrcLoUW3_j83CNV8mq93TePcbpRQPR_GkweIxzYAON0lnFiUK_MLue8tURFjHXSOJJqyBpYBuffjEfaDISlQxQ7ZYI8VayhcBq3k-lUX2R6zzApNApCqhscQKL_kPmae9CEju39_jVJub0FkOlFMI1q5_zbVkY6abstvpNXUVLs3dH36-ggfk';
  almacen_id: any = 1;
  almacenSolicitud: any;
  oficina_id: any = 1;
  userAlmacenes: any = [];
  userOficinas: any = [];
  almacenLogin: any;
  oficinaLogin: any;
 */
  

  getNombreAdminAlmacen = (id) => this.almacen.administradores.find((a) => a.id == id).name;
  getNombreOfiAlmacen = (id) => this.almacen.oficinas.find((o) => o.id == id).nombre;


  constructor() { }
}
