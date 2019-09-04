import { Injectable } from '@angular/core';
import { ServerService } from './server.service';
import { LoginDataService } from './login-data.service';
import { InsumosDataService } from './insumos-data.service';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { SolicitudDataService } from './solicitud-data.service';
import { PedidosDataService } from './pedidos-data.service';
import { Router } from "@angular/router";
import { UsuariosDataService } from './usuarios-data.service';



@Injectable({
  providedIn: 'root'
})
export class ConectionsService {

  serverUrl: string = "https://server-tickets.herokuapp.com/api";
/* 
  serverUrl: string = "http://127.0.0.1:8000/api"; */

  list: any[];

  constructor(
      private http: HttpClient, 
      private server: ServerService,
      private router: Router, 
      private loginData: LoginDataService, 
      private insumos: InsumosDataService, 
      private solicitud: SolicitudDataService,
      private pedidos: PedidosDataService,
      private usuarios: UsuariosDataService
      ) { 
  }


  login = (username, password) =>  {

    this.loginData.loading = true;

    let params = new HttpParams().set('usuario', username);
    params.set('contrasena', password);

    this.http.post(this.serverUrl + '/conectar',
      {
        'usuario': username,
        'contrasena': password
      })
      .subscribe((res: any) => {
        
        if (res.error) {
          this.loginData.error = res.errorType;
        }else {
          this.loginData.logged = true;
          this.loginData.type = res.tipo;
          this.loginData.id = res.id;
          this.loginData.error = 2;
          this.loginData.fullName = res.nombre;
          this.router.navigate(['/']);
        }

        this.loginData.loading = false;

      }
      );

  }

  logOut = () => {
    this.loginData.logged = false;
    this.loginData.type = 0;
    this.loginData.error = 2;
    this.loginData.loading = false;
    this.loginData.fullName = "";
  }

  getUsuarios = () => {

    this.usuarios.usuarios = [];
    this.usuarios.loading = true;

    this.http.get(this.serverUrl + '/usuarios').subscribe((res: any) => {

      if (!res.error) {
        this.usuarios.usuarios = res
      }

      this.usuarios.loading = false;

    });

  }

  checkAlerta = () => {
    
    this.insumos.insumosAlerta = [];
    this.insumos.alerta = false;

    this.insumos.insumos.forEach(insumo => {
    if (insumo.stock < insumo.alerta) {
      this.insumos.alerta = true;
      this.insumos.insumosAlerta.push(insumo);
    }
    });

  }
  
  
  getProducts = () => {
    this.insumos.insumos = [];
    this.insumos.loading = true;

    this.http.get(this.serverUrl + '/productos').subscribe((res: any) => {
      if (!res.error) {
      res.forEach(item => {

        this.insumos.insumos.push(item);
      
      });
        this.insumos.loading = false;
      } 

      this.checkAlerta();

      this.insumos.loading = false;
      
    });

  }

  getProductsUser = () => {
    this.insumos.insumos = [];
    this.insumos.loading = true;

    let id = this.loginData.id.toString();
    let params = new HttpParams().set('usuario_id', id);

    this.http.get(this.serverUrl + '/uproductos', { "params": params }).subscribe((res: any) => {
      if (!res.error) {
      res.forEach(item => {
        this.insumos.insumos.push(item);
      });
        this.insumos.loading = false;
      } 
      this.checkAlerta();
      this.insumos.loading = false;
      
    });

  }

  getProduct = (id) => {
    this.insumos.insumo = [];
    this.insumos.loading = true;
    this.http.get(this.serverUrl + '/productos/' + id).subscribe((res: any) => {
      if (!res.error) {
        this.insumos.insumo = res;
        this.insumos.loading = false;
      }
      this.checkAlerta();
      this.insumos.loading = false;
    });
  }

  deleteProduct = (id) => {

    this.insumos.insumos = [];
    this.insumos.loading = true;
    this.insumos.ventana = 1;

    this.http.delete(this.serverUrl + '/productos/' + id)
      .subscribe((res: any[]) => {

        res.forEach(item => {
          this.insumos.insumos.push(item);
          this.checkAlerta();
          this.insumos.loading = false;
        });

      }
      );

  }

  sendProduct = (product) => {

    this.insumos.insumos = [];
    this.insumos.loading = true;
    this.insumos.ventana = 1;

    this.http.post(this.serverUrl + '/productos',
      product)
      .subscribe((res: any[]) => {
          
          res.forEach(item => {

            this.insumos.insumos.push({
              id: item.id,
              codigo: item.codigo,
              nombre: item.nombre,
              minimo: item.minimo,
              maximo: item.maximo,
              stock: item.stock,
              alerta: item.alerta,
            })
            this.insumos.loading = false;
            this.checkAlerta();
            this.insumos.loading = false;
            
          });

        }
      );

  };

  

  sendTrato = (trato) => {

    this.insumos.insumos = [];
    this.insumos.loading = true;
    trato.producto_id = this.insumos.insumo.id;

    this.http.post(this.serverUrl + '/tratos',
      trato)
      .subscribe((res: any[]) => {
        res.forEach(item => {
          this.insumos.insumos.push({
            id: item.id,
            codigo: item.codigo,
            nombre: item.nombre,
            minimo: item.minimo,
            maximo: item.maximo
          })
        });
        
        this.getProduct(this.insumos.insumo.id);
      }
      );

  };

  deleteTrato = (id) => {

    this.insumos.insumos = [];
    this.insumos.loading = true;


    this.http.delete(this.serverUrl + '/tratos/' + id)
      .subscribe((res: any[]) => {

        res.forEach(item => {
          this.insumos.insumos.push({
            id: item.id,
            codigo: item.codigo,
            nombre: item.nombre,
            minimo: item.minimo,
            maximo: item.maximo
          })
          
          this.getProduct(this.insumos.insumo.id);
        });

      }
      );

  }

  
  

  updateProduct = (product) => {

    this.insumos.insumos = [];
    this.insumos.loading = true;
    this.insumos.ventana = 1;

    product.usuario_id = this.loginData.id;

    this.http.put(this.serverUrl + '/productos/' + product.id,
      product)
      .subscribe((res: any[]) => {

        res.forEach(item => {

          this.insumos.insumos.push(item);
          

        });
        this.checkAlerta();
        this.insumos.loading = false;
      }
      );

  };

  updateProductStock = (pack) => {

    this.insumos.insumos = [];
    this.insumos.loading = true;
    this.insumos.ventana = 1;

    let product = {
      usuario_id: this.loginData.id,
      stock: pack.stock
    }  

    this.http.put(this.serverUrl + '/productos/' + pack.id,
      product)
      .subscribe((res: any[]) => {

        res.forEach(item => {
          this.insumos.insumos.push(item);
        });
        this.checkAlerta();
        this.insumos.loading = false;
      }
      );

  };

  getPedidos = () => {
    this.pedidos.pedidos = [];
    this.pedidos.loading = true;

    let id = this.loginData.id.toString();
    let params = new HttpParams().set('usuario_id', id);

    this.http.get(this.serverUrl + '/pedidos', { "params": params}).subscribe((res: any) => {
      if (!res.error) {
        res.forEach(item => {
          this.pedidos.pedidos.push({
            ...item
          })
        });
      }

      /* console.log(this.pedidos.pedidos); */

      this.pedidos.pedidosFiltrados = this.pedidos.pedidos;
      this.pedidos.loading = false;

    });

  }

  getPedido = (id) => {
    this.pedidos.pedido = [];
    this.pedidos.loading = true;
    this.http.get(this.serverUrl + '/pedidos/' + id).subscribe((res: any) => {
      if (!res.error) {
        this.pedidos.pedido = res;
      }

      this.pedidos.loading = false;

    });

  }

  sendPedido = () => {

    this.insumos.insumos = [];
    this.solicitud.loading = true;
    this.solicitud.ventana = 2;

    let productos = [];

    this.solicitud.solicitud.insumos.forEach(ins => {
      productos.push({
        producto_id: ins.id,
        cantidad: ins.cantidad
      })
    });

    let pack = {
      productos: productos,
      usuario_id: this.loginData.id,
      comentario_usuario: this.solicitud.solicitud.comentarioUsuario
    }

    this.http.post(this.serverUrl + '/pedidos', pack
      )
      .subscribe((res: any) => {
          this.solicitud.aprobado = res.aprobado;
          this.solicitud.loading = false;
        });

  }

  updatePedido = (estado, comentario = "") => {

    this.pedidos.loading = true;

    let pack = {
      estado: estado,
      comentario_administrador: comentario,
      aprovado_por: this.loginData.id
    }

    this.http.put(this.serverUrl + '/pedidos/' + this.pedidos.pedido.pedido_id, pack
    )
      .subscribe((res: any) => {
        
        if (res.sucess) {
          this.pedidos.ventana = 1;
          this.getPedidos();
        } else {
          this.pedidos.ventana = 3;
          this.pedidos.loading = false;
        }
        
      });

  }

  
  }
  



