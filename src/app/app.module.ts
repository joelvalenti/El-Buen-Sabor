import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';

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
import { IndexAdminComponent } from './components/administrador/index/index.component';
import { ModalUsuarioComponent } from './components/administrador/modales/modal-usuario/modal-usuario.component';
import { ComandaComponent } from './components/comanda/comanda.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { ModalDomicilioComponent } from './pages/carrito/modal-domicilio/modal-domicilio.component';
import { ModalDetalleComponent } from './pages/carrito/modal-detalle/modal-detalle.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { CategoriaComponent } from './components/administrador/categoria/categoria.component';
import { ModalCategoriaComponent } from './components/administrador/modales/modal-categoria/modal-categoria.component';
import { PedidoComponent } from './components/administrador/pedido/pedido.component';
import { ModalDetallePedidoComponent } from './components/administrador/modales/modal-detalle-pedido/modal-detalle-pedido.component';
import { RecetaComponent } from './components/administrador/receta/receta.component';
import { ModalPlatoComponent } from './components/administrador/modales/modal-plato/modal-plato.component';
import { ModalIngredienteComponent } from './components/administrador/modales/modal-ingrediente/modal-ingrediente.component';
import { InsumoComponent } from './components/administrador/insumo/insumo.component';
import { ModalInsumoComponent } from './components/administrador/modales/modal-insumo/modal-insumo.component';
import { FaltanteStockComponent } from './components/administrador/faltante-stock/faltante-stock.component';
import { RankingPlatosComponent } from './components/administrador/ranking-platos/ranking-platos.component';
import { RealizarPedidoComponent } from './components/cajero/realizar-pedido/realizar-pedido.component';
import { ConfirmarPedidoComponent } from './components/cajero/confirmar-pedido/confirmar-pedido.component';
import { CocinaPedidoComponent } from './components/cajero/cocina-pedido/cocina-pedido.component';
import { ModalRealizarPedidoUsuarioComponent } from './components/cajero/modales/modal-realizar-pedido-usuario/modal-realizar-pedido-usuario.component';
import { ModalRealizarPedidoDomicilioComponent } from './components/cajero/modales/modal-realizar-pedido-domicilio/modal-realizar-pedido-domicilio.component';
import { ModalRealizarPedidoUsuarioCrearComponent } from './components/cajero/modales/modal-realizar-pedido-usuario-crear/modal-realizar-pedido-usuario-crear.component';
import { ModalRealizarPedidoDomicilioCrearComponent } from './components/cajero/modales/modal-realizar-pedido-domicilio-crear/modal-realizar-pedido-domicilio-crear.component';
import { IndexCajeroComponent } from './components/cajero/index/index.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';

// Pipes
import { FilterBuscarRecetaPipe } from './pipes/filter-buscar-receta.pipe';
import { DatePipe } from '@angular/common';

//Firebase
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';

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
    UsuarioComponent,
	  IndexAdminComponent,
    UsuarioComponent,
    ModalUsuarioComponent,
    CategoriaComponent,
    ModalCategoriaComponent,
    PedidoComponent,
    ModalDetallePedidoComponent,
    RecetaComponent,
    ModalPlatoComponent,
    ModalIngredienteComponent,
    InsumoComponent,
    ModalInsumoComponent,
    FaltanteStockComponent,
    RankingPlatosComponent,
    RealizarPedidoComponent,
    ConfirmarPedidoComponent,
    CocinaPedidoComponent,
    IndexCajeroComponent,
    ConfirmarPedidoComponent,
    RealizarPedidoComponent,
    CocinaPedidoComponent,
    ModalRealizarPedidoUsuarioComponent,
    ModalRealizarPedidoDomicilioComponent,
    ModalRealizarPedidoUsuarioCrearComponent,
    ModalRealizarPedidoDomicilioCrearComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
		AngularFireDatabaseModule,
		AngularFireStorageModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
