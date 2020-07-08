import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  /*{ path : '', component: HomeComponent },
  { path: 'catalogo', component: CatalogoComponent},
  { path: 'productos', component: ProductosComponent},
  { path: 'carrito', component: CarritoComponent},
  { path: 'delivery', component: DeliveryComponent},
  { path: 'cocina', component: CocinaComponent},
  { path: 'cajero', component: CajeroComponent},
  { path: 'usuario', component: UsuarioComponent},
  { path: 'administrador', component: AdministradorComponent},
  { path: '**', component: Page404Component} //Esta siempre debe quedar al final.*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }