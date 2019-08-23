import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';


import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { NavBarComponent } from './components/shared/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { SolicitudesComponent } from './components/solicitudes/solicitudes.component';
import { EntrantesComponent } from './components/entrantes/entrantes.component';
import { PedidoUsuarioComponent } from './components/pedido-usuario/pedido-usuario.component';
import { CrearSolicitudComponent } from './components/crear-solicitud/crear-solicitud.component';
import { LoginScreenComponent } from './components/login-screen/login-screen.component';
import { EvaluarComponent } from './components/evaluar/evaluar.component';
import { CrearBienesComponent } from './components/crear-bienes/crear-bienes.component';
import { BienesComponent } from './components/bienes/bienes.component';
import { EditarBienesComponent } from './components/editar-bienes/editar-bienes.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    SolicitudesComponent,
    EntrantesComponent,
    PedidoUsuarioComponent,
    CrearSolicitudComponent,
    LoginScreenComponent,
    EvaluarComponent,
    CrearBienesComponent,
    BienesComponent,
    EditarBienesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FormsModule      
  ],
  providers: [AngularFirestoreModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
