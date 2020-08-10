import { UsuarioComponent } from './pages/usuario/usuario.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CocinaComponent } from './pages/cocina/cocina.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { IndexAdminComponent } from './components/administrador/index/index.component';
import { IndexCajeroComponent } from './components/cajero/index/index.component';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path : '', component: HomeComponent },
  { path: 'catalogo', component: CatalogoComponent},
  { path: 'delivery', component: DeliveryComponent},
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
