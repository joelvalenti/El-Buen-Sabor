import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
// Material
import { MaterialModule } from './material.module';
// Paginas
import { CocinaComponent } from './pages/cocina/cocina.component';
// Componentes
import { ComandaComponent } from './components/comanda/comanda.component';
// Pipes
import { FilterBuscarRecetaPipe } from './pipes/filter-buscar-receta.pipe';

@NgModule({
  entryComponents: [],
  declarations: [
    AppComponent,
    CocinaComponent,
    ComandaComponent,
    FilterBuscarRecetaPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
