import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/components/home/home.component';
import { NotificacionComponent } from './views/components/notificacion/notificacion.component';

const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path:'notificacion', component:NotificacionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
