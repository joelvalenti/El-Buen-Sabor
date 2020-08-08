import { UsuarioComponent } from './pages/usuario/usuario.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CocinaComponent } from './pages/cocina/cocina.component';
import { CarritoComponent } from './pages/carrito/carrito.component';

const routes: Routes = [
  /*{ path : '', component: HomeComponent },
  { path: 'catalogo', component: CatalogoComponent},
  { path: 'productos', component: ProductosComponent},
  { path: 'delivery', component: DeliveryComponent},*/
  { path: 'carrito', component: CarritoComponent},
  { path: 'usuario', component: UsuarioComponent},
  { path: 'cocina', component: CocinaComponent },
  /*{ path: 'cajero', component: CajeroComponent},
  { path: 'administrador', component: AdministradorComponent},
  { path: '**', component: Page404Component} //Esta siempre debe quedar al final.*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
