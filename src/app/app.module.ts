import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Material
import { MaterialModule } from './material.module';
// Paginas
import { CocinaComponent } from './pages/cocina/cocina.component';
// Componentes
import { ComandaComponent } from './components/comanda/comanda.component';

@NgModule({
  entryComponents: [],
  declarations: [
    AppComponent,
    CocinaComponent,
    ComandaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
