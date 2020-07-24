import { UsuarioComponent } from './components/administrador/usuario/usuario.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//MODULOS
import { MaterialModule } from './modulos/material.module';

import { NgxPaginationModule } from 'ngx-pagination';
import { IndexComponent } from './components/administrador/index/index.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalUsuarioComponent } from './components/administrador/modales/modal-usuario/modal-usuario.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CategoriaComponent } from './components/administrador/categoria/categoria.component';
import { ModalCategoriaComponent } from './components/administrador/modales/modal-categoria/modal-categoria.component';
import { PedidoComponent } from './components/administrador/pedido/pedido.component';
import { ModalPedidoComponent } from './components/administrador/modales/modal-pedido/modal-pedido.component';
import { ModalDetallePedidoComponent } from './components/administrador/modales/modal-detalle-pedido/modal-detalle-pedido.component';
import { RecetaComponent } from './components/administrador/receta/receta.component';
import { ModalPlatoComponent } from './components/administrador/modales/modal-plato/modal-plato.component';
import { ModalIngredienteComponent } from './components/administrador/modales/modal-ingrediente/modal-ingrediente.component';
import { InsumoComponent } from './components/administrador/insumo/insumo.component';
import { ModalInsumoComponent } from './components/administrador/modales/modal-insumo/modal-insumo.component';
import { FaltanteStockComponent } from './components/administrador/faltante-stock/faltante-stock.component';


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    UsuarioComponent,
    ModalUsuarioComponent,
    CategoriaComponent,
    ModalCategoriaComponent,
    PedidoComponent,
    ModalPedidoComponent,
    ModalDetallePedidoComponent,
    RecetaComponent,
    ModalPlatoComponent,
    ModalIngredienteComponent,
    InsumoComponent,
    ModalInsumoComponent,
    FaltanteStockComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
