import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { SolicitudesComponent } from './components/solicitudes/solicitudes.component';
import { EntrantesComponent } from './components/entrantes/entrantes.component';
import { PedidoUsuarioComponent } from './components/pedido-usuario/pedido-usuario.component';
import { CrearSolicitudComponent } from './components/crear-solicitud/crear-solicitud.component';
import { EvaluarComponent } from './components/evaluar/evaluar.component';
import { BienesComponent } from './components/bienes/bienes.component';
import { CrearBienesComponent } from './components/crear-bienes/crear-bienes.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'inicio', component: HomeComponent },
  { path: 'solicitudes', component: SolicitudesComponent },
  { path: 'entrantes', component: EntrantesComponent },
  { path: 'detalles/:id', component: PedidoUsuarioComponent },
  { path: 'crear', component: CrearSolicitudComponent },
  { path: 'evaluar', component: EvaluarComponent },
  { path: 'bienes', component: BienesComponent },
  { path: 'bienes/crear', component: CrearBienesComponent },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }