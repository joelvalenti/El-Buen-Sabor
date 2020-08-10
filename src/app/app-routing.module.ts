import { UsuarioComponent } from './pages/usuario/usuario.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CocinaComponent } from './pages/cocina/cocina.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { IndexAdminComponent } from './components/administrador/index/index.component';
import { IndexCajeroComponent } from './components/cajero/index/index.component';

const routes: Routes = [
  /*{ path : '', component: HomeComponent },
  { path: 'catalogo', component: CatalogoComponent},
  { path: 'productos', component: ProductosComponent},
  { path: 'delivery', component: DeliveryComponent},*/
  { path: 'carrito', component: CarritoComponent},
  { path: 'usuario', component: UsuarioComponent},
  { path: 'cocina', component: CocinaComponent },
  { path: 'administrador', component: IndexAdminComponent},
  { path: 'cajero', component: IndexCajeroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
