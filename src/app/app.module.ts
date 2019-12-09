import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';

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
import { SearchPipe } from './pipes/search.pipe';
import { SearchOficinaPipe } from './pipes/search-oficina.pipe';
import { SearchCategoriaPipe } from './pipes/search-categoria.pipe';
import { SearchPedidoPipe } from './pipes/search-pedido.pipe';
import { InsumoCategoriaPipe } from './pipes/insumo-categoria.pipe';
import { SearchTratoPipe } from './pipes/search-trato.pipe';
import { FiltrarEntregadasPipe } from './pipes/filtrar-entregadas.pipe';
import { UtilidadesComponent } from './components/utilidades/utilidades.component';
import { SearchUsuarioPipe } from './pipes/search-usuario.pipe';
import { SearchUsuarioNombrePipe } from './pipes/search-usuario-nombre.pipe';

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
    SearchPipe,
    SearchOficinaPipe,
    SearchCategoriaPipe,
    SearchPedidoPipe,
    InsumoCategoriaPipe,
    SearchTratoPipe,
    FiltrarEntregadasPipe,
    UtilidadesComponent,
    SearchUsuarioPipe,
    SearchUsuarioNombrePipe,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(),
    NgSelectModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
