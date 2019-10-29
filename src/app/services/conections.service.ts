import { Injectable } from '@angular/core';
import { LoginDataService } from './login-data.service';
import { InsumosDataService } from './insumos-data.service';
import { HttpClient, HttpParams, HttpHeaders  } from '@angular/common/http';

import { SolicitudDataService } from './solicitud-data.service';
import { PedidosDataService } from './pedidos-data.service';
import { Router } from "@angular/router";
import { UsuariosDataService } from './usuarios-data.service';
import { CategoriasDataService } from './categorias-data.service';
import { AlmacenesDataService } from './almacenes-data.service';
import { OficinasDataService } from './oficinas-data.service';




@Injectable({
  providedIn: 'root'
})
export class ConectionsService {

/*   serverUrl: string = "https://server-tickets.herokuapp.com/api"; */

  serverUrl: string = "http://127.0.0.1:8000/api";

  list: any[];

  constructor(
      private http: HttpClient, 
      private router: Router, 
      private loginData: LoginDataService, 
      private insumos: InsumosDataService,
      private categorias: CategoriasDataService, 
      private solicitud: SolicitudDataService,
      private pedidos: PedidosDataService,
      private usuarios: UsuariosDataService,
      private almacenes: AlmacenesDataService,
      private oficinas: OficinasDataService
      ) { 
  }

  toHome = () => {
    this.router.navigate(['/']); 
  }

  kickToHome = (type) => {
    if (type == this.loginData.type) {
      this.router.navigate(['/']);
    }
  }

  registrarUsuario = (usuario) => {

    this.usuarios.loading = true;

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.loginData.token
      })
    };

    this.http.post(this.serverUrl + '/auth/signup', usuario, httpOptions)
      .subscribe((res: any) => {
        if (res.error) {
          console.log(res);
        } else {
        this.getUsuarios('all');
        }
        this.usuarios.loading = false;
      }
      );

  }
  
  login = (email, password) =>  {

    this.loginData.loading = true;

    let pack = {
      'email': email,
      'password': password
    };

    this.http.post(this.serverUrl + '/auth/login', pack)
      .subscribe((res: any) => {
        if (res.error) {
          this.loginData.error = 1;
        }else {
          
          this.loginData.type = res.user.type;
          this.loginData.id = res.user.id;
          this.loginData.error = 2;
          this.loginData.fullName = res.user.name;
          this.loginData.token = res.access_token;
          this.loginData.userAlmacenes = res.user.almacenes;
          this.loginData.userOficinas = res.user.oficinas;

          if (res.user.type == 9) {
            this.loginData.logged = true;
            this.router.navigate(['/']);
          } else {
            this.loginData.ventana = 2;
          }
          
        }

        console.log(res);
        
        this.loginData.loading = false;

      }
      );

  }

  getUser = () => {

    this.loginData.loading = true;

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.loginData.token
      })
    };

    this.http.get(this.serverUrl + '/auth/user', httpOptions).subscribe((res: any) => {

      if (res.error) {
        this.loginData.error = 1;
      } else {

        this.loginData.type = res.type;
        this.loginData.id = res.id;
        this.loginData.error = 2;
        this.loginData.fullName = res.name;
        if (res.type == 0) {
          this.loginData.almacen_id = null;
        }
        if (res.almacenes) {
          this.loginData.userAlmacenes = res.almacenes; 
        }
        if (res.oficinas) {
          this.loginData.userOficinas = res.oficinas;
        }
        this.loginData.ventana = 2;
        
      }

      console.log(res);

      this.loginData.loading = false;

    });

  }

  logOut = () => {

    this.loginData.loading = true;
    this.loginData.ventana = 1;

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.loginData.token
      })
    };

    this.http.get(this.serverUrl + '/auth/logout', httpOptions).subscribe((res: any) => {

      this.loginData.loading = false;



      if (res.logout) {
        this.loginData.logged = false;
        this.loginData.type = 0;
        this.loginData.error = 2;
        
        this.loginData.fullName = "";
        this.loginData.token = "";
        this.loginData.type = 0;
        this.loginData.id = null;
        this.loginData.error = 2;
        this.loginData.loading= false;
        this.loginData.fullName= "";
        this.loginData.token = null;
        this.loginData.almacen_id = null;
        this.loginData.almacenSolicitud = null;
        this.loginData.oficina_id = null;
        this.loginData.userAlmacenes= [];
        this.loginData.userOficinas = [];
        this.loginData.almacenLogin = [];
        this.loginData.oficinaLogin = [];
        this.loginData.almacen = null;
        this.loginData.almacen = null;
      }

      this.loginData.loading = false;

    });

  }

  getAlmacenes = () => {

    this.almacenes.loading = true;
    this.almacenes.almacenes = [];

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.loginData.token
      })
    };

    this.http.get(this.serverUrl + '/auth/almacenes', httpOptions).subscribe((res: any) => {

      this.loginData.loading = false;

      console.log(res);

      if (!res.empy) {
        this.almacenes.almacenes = [];
        res.forEach(item => {
          this.almacenes.almacenes.push(item);
        });
      }

      this.almacenes.loading = false;

    });

  }

  getAlmacen = () => {
    this.loginData.almacen = [];
    this.loginData.loading = true;

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.loginData.token
      })
    };

    this.http.get(this.serverUrl + '/auth/almacenes/' + this.loginData.almacen_id, httpOptions).subscribe((res: any) => {
      
      console.log('al');
      console.log(res);

      if (!res.error) {
        this.loginData.almacen  = res;
      }
      this.loginData.loading = false;
    });
  }

  sendAlmacen = (nombre) => {

    this.almacenes.loading = true;

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.loginData.token
      })
    };

    this.http.post(this.serverUrl + '/auth/almacenes', {nombre: nombre},
      httpOptions)
      .subscribe((res: any[]) => {
        console.log(res);
        this.getAlmacenes();
      }
    );

  };

  insertOficinaAlmacen = (almacen_id, oficina_id) => {

    this.almacenes.loading = true;

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.loginData.token
      })
    };

    let pack = { action: 1, oficina_id: oficina_id}

    this.http.put(this.serverUrl + '/auth/almacenes/' + almacen_id, pack, httpOptions)
      .subscribe((res: any[]) => {
        console.log(res);
        this.getAlmacenes();
      }
      );

  };

  quitarOficinaAlmacen = (almacen_id, oficina_id) => {

    this.almacenes.loading = true;

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.loginData.token
      })
    };

    let pack = { action: 2, oficina_id: oficina_id }

    this.http.put(this.serverUrl + '/auth/almacenes/' + almacen_id, pack, httpOptions)
      .subscribe((res: any[]) => {
        console.log(res);
        this.getAlmacenes();
      }
      );

  };

  insertAdminAlmacen = (almacen_id, admin_id) => {

    this.almacenes.loading = true;

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.loginData.token
      })
    };

    let pack = { action: 3, administrador_id: admin_id }

    this.http.put(this.serverUrl + '/auth/almacenes/' + almacen_id, pack, httpOptions)
      .subscribe((res: any[]) => {
        console.log(res);
        this.getAlmacenes();
      }
      );

  };

  quitarAdminAlmacen = (almacen_id, admin_id) => {

    this.almacenes.loading = true;

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.loginData.token
      })
    };

    let pack = { action: 4, administrador_id: admin_id }

    this.http.put(this.serverUrl + '/auth/almacenes/' + almacen_id, pack, httpOptions)
      .subscribe((res: any[]) => {
        console.log(res);
        this.getAlmacenes();
      }
      );

  };

  cambiarNombreAlmacen = (almacen_id, nombre) => {

    this.almacenes.loading = true;

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.loginData.token
      })
    };

    let pack = { action: 0, nombre: nombre }

    this.http.put(this.serverUrl + '/auth/almacenes/' + almacen_id, pack, httpOptions)
      .subscribe((res: any[]) => {
        console.log(res);
        this.getAlmacenes();
      }
      );

  };

  getOficinas = () => {

    this.oficinas.loading = true;
    this.oficinas.oficinas = [];

    const httpOptions: any = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.loginData.token
      }),
    };

    if (this.loginData.almacen_id) {
      httpOptions.params = new HttpParams().set('almacene_id', this.loginData.almacen_id);
    }

    this.http.get(this.serverUrl + '/auth/oficinas', httpOptions).subscribe((res: any) => {

      this.loginData.loading = false;

      console.log(res);

      if (!res.empy) {
        this.oficinas.oficinas = [];
        res.forEach(item => {
          this.oficinas.oficinas.push(item);
        });
      }

      this.oficinas.loading = false;

    });

  }

  sendOficina = (nombre) => {

    this.oficinas.loading = true;

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.loginData.token
      })
    };

    this.http.post(this.serverUrl + '/auth/oficinas', { nombre: nombre },
      httpOptions)
      .subscribe((res: any[]) => {
        console.log(res);
        this.getOficinas();
      }
    );

  };


  cambiarNombreOficina = (oficina_id, nombre) => {

    this.oficinas.loading = true;

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.loginData.token
      })
    };

    let pack = { action: 0, nombre: nombre }

    this.http.put(this.serverUrl + '/auth/oficinas/' + oficina_id, pack, httpOptions)
      .subscribe((res: any[]) => {
        console.log(res);
        this.getOficinas();
      }
      );

  };

  insertUsuarioOficina = (oficina_id, user_id) => {

    this.oficinas.loading = true;

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.loginData.token
      })
    };

    let pack = { action: 1, user_id: user_id }

    this.http.put(this.serverUrl + '/auth/oficinas/' + oficina_id, pack, httpOptions)
      .subscribe((res: any[]) => {
        console.log(res);
        this.getOficinas();
      }
    );

  };

  quitarUsuarioOficina = (oficina_id, user_id) => {

    this.oficinas.loading = true;

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.loginData.token
      })
    };

    let pack = { action: 2, user_id: user_id }

    this.http.put(this.serverUrl + '/auth/oficinas/' + oficina_id, pack, httpOptions)
      .subscribe((res: any[]) => {
        console.log(res);
        this.getOficinas();
      }
    );

  };

  getUsuarios = (type) => {

    this.usuarios.usuarios = [];
    this.usuarios.loading = true;

    const httpOptions: any = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.loginData.token
      })
    };

    let ty;
    if (type == 'users') {ty = 0}
    if (type == 'admins') {ty = 1}
    if (type == 'all') { ty = 99 }
    httpOptions.params = new HttpParams().set('type', ty);
   
    this.http.get(this.serverUrl + '/auth/usuarios', httpOptions).subscribe((res: any) => {

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
  
  getCategorias = () => {
    this.categorias.categorias = [];
    this.categorias.loading = true;

    const httpOptions: any = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.loginData.token
      }),
      params: new HttpParams().set('almacene_id', this.loginData.almacen_id)
    };

    this.http.get(this.serverUrl + '/auth/categorias', httpOptions).subscribe((res: any) => {
      if (!res.error) {
        this.categorias.categorias = [];
        res.forEach(item => {
          this.categorias.categorias.push(item);
        });
      }
      console.log(this.categorias.categorias);
      
      this.categorias.loading = false;
    });

  }

  sendCategoria = (nombre) => {

    this.categorias.loading = true;

    let categoria = {
      nombre: nombre,
      almacene_id: this.loginData.almacen_id
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.loginData.token
      })
    };

    this.http.post(this.serverUrl + '/auth/categorias',
      categoria, httpOptions)
      .subscribe((res: any[]) => {
        console.log(res);
        this.getCategorias();
      }
    );

  };

  sendSubcategoria = (nombre, categoria_id) => {

    this.categorias.loading = true;

    let subcategoria = {
      nombre: nombre,
      categoria_id: categoria_id,
      almacene_id: this.loginData.almacen_id
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.loginData.token
      })
    };

    this.http.post(this.serverUrl + '/auth/subcategorias',
      subcategoria, httpOptions)
      .subscribe((res: any[]) => {
        console.log(res);
        this.getCategorias();
      }
    );

  };

  updateCategoria = (nombre, categoria_id) => {

    this.categorias.loading = true;

    let categoria = {
      nombre: nombre,
      categoria_id: categoria_id,
      almacene_id: this.loginData.almacen_id
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.loginData.token
      })
    };

    this.http.put(this.serverUrl + '/auth/categorias/' + categoria.categoria_id,
      categoria, httpOptions)
      .subscribe((res: any[]) => {
          console.log(res);
          this.getCategorias();
      }
      );

  };



  getProducts = () => {
    this.insumos.insumos = [];
    this.insumos.loading = true;

    this.insumos.insumosAlerta = [];
    this.insumos.alerta = false;

    let params = new HttpParams().set('almacene_id', this.loginData.almacen_id).set('oficina_id', this.loginData.oficina_id);

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.loginData.token,
      }),
      params: params
    };

    this.http.get(this.serverUrl + '/auth/productos', httpOptions).subscribe((res: any) => {
      this.insumos.insumos = [];
      this.insumos.insumosAlerta = [];
      this.insumos.sinCategorias = [];

      console.log(res);
      

      if (!res.error) {
      res.forEach(item => {
        if (parseInt(item.stock) < parseInt(item.alerta)) {
          this.insumos.alerta = true;
          this.insumos.insumosAlerta.push(item);
        }
        if (item.subcategoria_id) {
          this.insumos.sinCategorias.push(item);
        }
        this.insumos.insumos.push(item);
      });
      } 
      this.insumos.loading = false;
    });

  }

  getProductsPanel = () => {
    this.insumos.insumos = [];
    this.insumos.loading = true;

    this.insumos.insumosAlerta = [];
    this.insumos.alerta = false;

    let params = new HttpParams().set('almacene_id', this.loginData.almacen_id).set('oficina_id', this.loginData.oficina_id).set('crear', 'true');

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.loginData.token,
      }),
      params: params
    };

    this.http.get(this.serverUrl + '/auth/productos', httpOptions).subscribe((res: any) => {
      this.insumos.insumos = [];
      this.insumos.insumosAlerta = [];
      this.insumos.sinCategorias = [];

      console.log(res);


      if (!res.error) {
        res.forEach(item => {
          if (parseInt(item.stock) < parseInt(item.alerta)) {
            this.insumos.alerta = true;
            this.insumos.insumosAlerta.push(item);
          }
          if (item.subcategoria_id) {
            this.insumos.sinCategorias.push(item);
          }
          this.insumos.insumos.push(item);
        });
      }
      this.insumos.loading = false;
    });

  }

  getProduct = (id) => {
    this.insumos.insumo = [];
    this.insumos.loading = true;

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.loginData.token
      }),
      params: new HttpParams().set('almacene_id', this.loginData.almacen_id)
    };

    this.http.get(this.serverUrl + '/auth/productos/' + id, httpOptions).subscribe((res: any) => {
      if (!res.error) {
        console.log('wwww');
        console.log(res);
        
        this.insumos.insumo = res;
      }
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
          this.insumos.loading = false;
        });

      }
      );

  }

  sendProduct = (producto) => {

    this.insumos.insumos = [];
    this.insumos.loading = true;
    this.insumos.ventana = 1;
    this.insumos.insumosAlerta = [];
    this.insumos.alerta = false;

    let pack = {
      ...producto,
      'user_id': this.loginData.id,
      'almacene_id': this.loginData.almacen_id
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.loginData.token
      })
    };

    this.http.post(this.serverUrl + '/auth/productos',
      pack, httpOptions)
      .subscribe((res: any[]) => {
        console.log(res);
        this.getProducts();
      });

  };

  updateProduct = (producto) => {

    this.insumos.insumos = [];
    this.insumos.loading = true;
    this.insumos.ventana = 1;
    this.insumos.insumosAlerta = [];
    this.insumos.alerta = false;

    let pack = {
      ...producto,
      'user_id': this.loginData.id,
      'almacene_id': this.loginData.almacen_id
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.loginData.token
      })
    };

    this.http.put(this.serverUrl + '/auth/productos/' + producto.id,
      pack, httpOptions)
      .subscribe((res: any) => {
        if (res.error) {
         
        }
        this.getProducts();
      }
    );

  };
  

  sendTrato = (trato) => {

    this.insumos.insumos = [];
    this.insumos.loading = true;
    trato.producto_id = this.insumos.insumo.id;
    this.insumos.insumosAlerta = [];
    this.insumos.alerta = false;

    let pack = {
      ...trato,
      'user_id': this.loginData.id,
      'almacene_id': this.loginData.almacen_id
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.loginData.token
      })
    };

    this.http.post(this.serverUrl + '/auth/tratos',
      pack, httpOptions)
      .subscribe((res: any[]) => {

        res.forEach(item => {

          this.insumos.insumos = [];
          this.insumos.insumosAlerta = [];

          if (parseInt(item.stock) < parseInt(item.alerta)) {
            this.insumos.alerta = true;
            this.insumos.insumosAlerta.push(item);
          }
          this.insumos.insumos.push(item);

        });
        
        this.getProduct(this.insumos.insumo.id);
      }
    );

  };

  deleteTrato = (id) => {

    this.insumos.insumos = [];
    this.insumos.loading = true;
    this.insumos.insumosAlerta = [];
    this.insumos.alerta = false;

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.loginData.token
      }),
      params: new HttpParams().set('almacene_id', this.loginData.almacen_id)
    };

    this.http.delete(this.serverUrl + '/auth/tratos/' + id, httpOptions)
      .subscribe((res: any[]) => {
        res.forEach(item => {

          this.insumos.insumos = [];
          this.insumos.insumosAlerta = [];

          if (parseInt(item.stock) < parseInt(item.alerta)) {
            this.insumos.alerta = true;
            this.insumos.insumosAlerta.push(item);
          }
          this.insumos.insumos.push(item);
        });
        this.getProduct(this.insumos.insumo.id);
      });

  }


  updateProductStock = (stock, comentario, id) => {

    this.insumos.insumos = [];
    this.insumos.loading = true;
    this.insumos.ventana = 1;
    this.insumos.insumosAlerta = [];
    this.insumos.alerta = false;

    let pack = {
      'stock': stock,
      'user_id': this.loginData.id,
      'almacene_id': this.loginData.almacen_id,
      'comentario': comentario
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.loginData.token
      })
    };

    this.http.put(this.serverUrl + '/auth/productos/' + id,
      pack, httpOptions)
      .subscribe((res: any) => {
        if (res.error) {

        }
        this.getProducts();
      }
      );

  };

  getPedidos = () => {
    this.pedidos.pedidos = [];
    this.pedidos.loading = true;

    let params = new HttpParams().set('almacene_id', this.loginData.almacen_id).set('oficina_id', this.loginData.oficina_id);

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.loginData.token,
      }),
      params: params
    };

    this.http.get(this.serverUrl + '/auth/pedidos', httpOptions).subscribe((res: any) => {
      if (!res.error) {

        this.pedidos.pedidos = [];

        res.forEach(item => {
          this.pedidos.pedidos.push({
            ...item
          })
        });
      }

      this.pedidos.pedidosFiltrados = this.pedidos.pedidos;
      this.pedidos.loading = false;

    });

  }

  getPedido = (id) => {

    this.pedidos.pedido = [];
    this.pedidos.loading = true;

    let params;
    if (this.loginData.type == 0) {
      params = new HttpParams().set('oficina_id', this.loginData.oficina_id);
    } else {
      params = new HttpParams().set('almacene_id', this.loginData.almacen_id);
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.loginData.token,
      }),
      params: params
    };

    this.http.get(this.serverUrl + '/auth/pedidos/' + id, httpOptions).subscribe((res: any) => {
      
      console.log(res);
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

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.loginData.token
      })
    };

    let pack = {
      productos: productos,
      usuario_id: this.loginData.id,
      almacene_id: this.loginData.almacen_id,
      oficina_id: this.loginData.oficina_id,
      comentario_usuario: this.solicitud.solicitud.comentarioUsuario
    }

    this.http.post(this.serverUrl + '/auth/pedidos', pack, httpOptions
      )
      .subscribe((res: any) => {
          this.solicitud.aprobado = res.aprobado;
          this.solicitud.loading = false;
        });

  }
  

  sendPedidoPanel = (idEmpleado) => {

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

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.loginData.token
      })
    };

    let pack = {
      productos: productos,
      empleado_id: idEmpleado,
      almacene_id: this.loginData.almacen_id,
      oficina_id: this.loginData.oficina_id,
      comentario_usuario: this.solicitud.solicitud.comentarioUsuario
    }

    this.http.post(this.serverUrl + '/auth/pedidos', pack, httpOptions
    )
      .subscribe((res: any) => {
        this.solicitud.aprobado = res.aprobado;
        this.solicitud.loading = false;
      });

  }


  updatePedido = (estado, comentario = "") => {

    this.pedidos.loading = true;

    let pack;

    if (this.loginData.type == 0) {
      pack = {
        estado: estado,
        comentario_administrador: comentario,
        almacene_id: this.loginData.almacen_id,
        oficina_id: this.loginData.oficina_id
      }
    } else {
      pack = {
        estado: estado,
        comentario_administrador: comentario,
        'almacene_id': this.loginData.almacen_id,
        'pack_aprobado': this.pedidos.packAprobado
      }
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.loginData.token
      })
    };

    this.http.put(this.serverUrl + '/auth/pedidos/' + this.pedidos.pedido.pedido_id, pack, httpOptions
    )
      .subscribe((res: any) => {
        
        if (res.sucess === false) {
          this.pedidos.ventana = 3;
          this.pedidos.loading = false;
        } else {
          this.pedidos.ventana = 1;
          this.getPedidos();
        }
        console.log(res);
      });

  }

  updatePedidoPanel = (empleado_id, comentario = "") => {

    this.pedidos.loading = true;

    let pack = {
      estado: 3,
      empleado_id: empleado_id,
      comentario_administrador: comentario,
      'almacene_id': this.loginData.almacen_id,
      'pack_aprobado': this.pedidos.packAprobado
      }

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.loginData.token
      })
    };

    this.http.put(this.serverUrl + '/auth/pedidos/' + this.pedidos.pedido.pedido_id, pack, httpOptions
    )
      .subscribe((res: any) => {

        if (res.sucess === false) {
          this.pedidos.ventana = 3;
          this.pedidos.loading = false;
        } else {
          this.pedidos.ventana = 1;
          this.getPedidos();
        }
        console.log(res);
      });

  }

  updatePreparacionPedido = (cantidadDias) => {

    this.pedidos.loading = true;

    let pack= {
      preparacion: cantidadDias,
      almacene_id: this.loginData.almacen_id
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.loginData.token
      })
    };

    this.http.put(this.serverUrl + '/auth/pedidos/' + this.pedidos.pedido.pedido_id, pack, httpOptions
    )
      .subscribe((res: any) => {

        if (res.sucess === false) {
          this.pedidos.ventana = 3;
          this.pedidos.loading = false;
        } else {
          this.pedidos.ventana = 1;
          this.getPedidos();
        }
        console.log(res);
      });

  }

  }

  



