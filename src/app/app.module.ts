import { ModalregistroComponent } from './components/modalregistro/modalregistro.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ModalingresarComponent } from './components/modalingresar/modalingresar.component';
import { Page404Component } from './components/page404/page404.component';
import { PerfilusuarioComponent } from './components/perfilusuario/perfilusuario.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ModalregistroComponent,
    ModalingresarComponent,
    Page404Component,
    PerfilusuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
