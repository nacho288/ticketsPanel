import { Injectable } from '@angular/core';
import { ServerService } from './server.service';
import { LoginDataService } from './login-data.service';
import { InsumosDataService } from './insumos-data.service';

@Injectable({
  providedIn: 'root'
})
export class ConectionsService {

  list: any[]



  constructor(private server: ServerService, private loginData : LoginDataService, private insumos: InsumosDataService) { 
  }

  getusers = () => {
    this.server.getUsers().subscribe((snap) => {
      if (snap.empty) {
        console.log('nope');
      } else {
        console.log(snap.docs[0].data());
/*         
        snap.docs.forEach((doc) => {
          console.log(doc.data());
        }) */
      }
    })
  }

  login = (username, password) =>  {
    this.server.getUser(username).subscribe((snap) => {

      let pack;

      if (snap.empty) {
        pack = {
          result: 0
        }
      } else {
        let outcome = (snap.docs[0].data().password == password) ? 2 : 1;
        pack = {
          result: outcome,
          name: snap.docs[0].data().nombre
        }
      }
      
      
      this.updateLogin(pack);
    })
  }

  updateLogin = (pack) => {

    this.loginData.loading = false;
    this.loginData.error = pack.result;
    this.loginData.logged = pack.result == 2 ? true : false;
    if (this.loginData.logged) {
      this.loginData.fullName = pack.name;
    }
    
  }

  logOut = () => {
    this.loginData.logged = false;
    this.loginData.type = 0;
    this.loginData.error = 2;
    this.loginData.loading = false;
    this.loginData.fullName = "";
  }
  
  getProducts = () => {
    this.insumos.insumos = [];
    this.insumos.loading = true;
    this.server.getProducts().subscribe((snap) => {
      if (snap.empty) {
        this.insumos.loading = false;
      } else {
        snap.docs.forEach((doc) => {
          let r = doc.data();
          this.insumos.insumos.push({
            id: r.id,
            nombre: r.nombre,
            minimo: r.minimo,
            maximo: r.maximo
          })
        })
        this.insumos.loading = false;
      }
    })
  }

  deleteProduct = (id) => {
    this.insumos.insumo = undefined;
    this.server.getProduct(id).subscribe((snap) => {
      this.server.deleteProduct(snap.docs[0].id).then(ref => {
        
      });
    })
  }



  sendProduct = (product) => {this.server.sendProduct(product)
  };
  
  
    
  }
  



