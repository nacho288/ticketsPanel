import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { SolicitudesComponent } from './components/solicitudes/solicitudes.component';
import { CrearSolicitudComponent } from './components/crear-solicitud/crear-solicitud.component';
import { BienesComponent } from './components/bienes/bienes.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { AlmacenesComponent } from './components/almacenes/almacenes.component';
import { OficinasComponent } from './components/oficinas/oficinas.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'inicio', component: HomeComponent },
  { path: 'solicitudes', component: SolicitudesComponent },
  { path: 'crear', component: CrearSolicitudComponent },
  { path: 'bienes', component: BienesComponent },
  { path: 'categorias', component: CategoriasComponent },
  { path: 'almacenes', component: AlmacenesComponent },
  { path: 'oficinas', component: OficinasComponent },
  { path: 'usuarios', component: UsuariosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }