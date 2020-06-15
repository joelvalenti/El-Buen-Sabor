import { ModalregistroComponent } from './components/modalregistro/modalregistro.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ModalingresarComponent } from './components/modalingresar/modalingresar.component';
import { Page404Component } from './components/page404/page404.component';
import { PerfilusuarioComponent } from './components/perfilusuario/perfilusuario.component';
import { MenuComponent } from './components/menu/menu.component';
import { ContactoComponent } from './components/contacto/contacto.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ModalregistroComponent,
    ModalingresarComponent,
    Page404Component,
    PerfilusuarioComponent,
    MenuComponent,
    ContactoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
