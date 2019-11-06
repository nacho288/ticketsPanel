import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { NavBarComponent } from './components/shared/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { SolicitudesComponent } from './components/solicitudes/solicitudes.component';

import { CrearSolicitudComponent } from './components/crear-solicitud/crear-solicitud.component';
import { LoginScreenComponent } from './components/login-screen/login-screen.component';

import { BienesComponent } from './components/bienes/bienes.component';
import { LoadingComponent } from './components/loading/loading.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { AlmacenesComponent } from './components/almacenes/almacenes.component';
import { OficinasComponent } from './components/oficinas/oficinas.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    SolicitudesComponent,
    CrearSolicitudComponent,
    LoginScreenComponent,
    BienesComponent,
    LoadingComponent,
    CategoriasComponent,
    AlmacenesComponent,
    OficinasComponent,
    UsuariosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
