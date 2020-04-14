import { PerfilusuarioComponent } from './components/perfilusuario/perfilusuario.component';
import { Page404Component } from './components/page404/page404.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path : '', component: HomeComponent },
  { path: 'perfil', component: PerfilusuarioComponent},
  { path: '**', component: Page404Component} //Esta siempre debe quedar al final.
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
