import { UsuarioComponent } from './pages/usuario/usuario.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// Material
import { MaterialModule } from './material.module';
// Paginas
import { CocinaComponent } from './pages/cocina/cocina.component';
// Componentes
import { ComandaComponent } from './components/comanda/comanda.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { ModalDomicilioComponent } from './pages/carrito/modal-domicilio/modal-domicilio.component';
import { ModalDetalleComponent } from './pages/carrito/modal-detalle/modal-detalle.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
// Pipes
import { FilterBuscarRecetaPipe } from './pipes/filter-buscar-receta.pipe';

@NgModule({
  entryComponents: [],
  declarations: [
    AppComponent,
    CocinaComponent,
    ComandaComponent,
    CarritoComponent,
    ModalDomicilioComponent,
    ModalDetalleComponent,
    PerfilComponent,
    FilterBuscarRecetaPipe,
    UsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
