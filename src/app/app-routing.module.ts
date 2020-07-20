import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CocinaComponent } from './pages/cocina/cocina.component';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { CajeroComponent } from './pages/cajero/cajero.component';

const routes: Routes = [
  /*{ path : '', component: HomeComponent },
  { path: 'catalogo', component: CatalogoComponent},
  { path: 'productos', component: ProductosComponent},
  { path: 'carrito', component: CarritoComponent},*/
  { path: 'delivery', component: DeliveryComponent },
  { path: 'cocina', component: CocinaComponent },
  { path: 'cajero', component: CajeroComponent },
  /*{ path: 'usuario', component: UsuarioComponent},
  { path: 'administrador', component: AdministradorComponent},
  { path: '**', component: Page404Component} //Esta siempre debe quedar al final.*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
