import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NbChoicesModule } from 'nb-choices';


import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NavBarComponent } from './components/shared/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { SolicitudesComponent } from './components/solicitudes/solicitudes.component';

import { CrearSolicitudComponent } from './components/crear-solicitud/crear-solicitud.component';
import { LoginScreenComponent } from './components/login-screen/login-screen.component';

import { BienesComponent } from './components/bienes/bienes.component';
import { LoadingComponent } from './components/loading/loading.component';
import { CategoriasComponent } from './components/categorias/categorias.component';


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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NbChoicesModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
