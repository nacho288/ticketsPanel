import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private firestore: AngularFirestore, private router: Router) { }

  getUsers = () => this.firestore.collection('users', ref => ref.where('nombre', '==', 'pepito')).get();

  getUser = (nombre) => this.firestore.collection('users', ref => ref.where('nombre', '==', nombre)).get();

  getProducts = () => this.firestore.collection('products').get();

  getProduct = (id) => this.firestore.collection('products', ref => ref.where('id', '==', id)).get();

  deleteProduct = (id) => this.firestore.collection('products').doc('id').delete();
  
  sendProduct = (product) => {
    this.firestore.collection('products').add(product).then(ref => {
      console.log('wiiii: ', ref.id);
      this.router.navigate(['/bienes']);
    });
  }
  
}


