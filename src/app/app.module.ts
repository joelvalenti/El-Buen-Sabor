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
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './pages/navbar/navbar.component';

// Componentes
import { DetallePlatoComponent } from './components/detalle-plato/detalle-plato.component';
import { ModalloginComponent } from './components/modallogin/modallogin.component';
import { ModalregistroComponent } from './components/modalregistro/modalregistro.component';
// Pipes
import { FilterBuscarRecetaPipe } from './pipes/filter-buscar-receta.pipe';
import { FilterBuscarLocalidadPipe } from './pipes/filter-buscar-localidad.pipe';
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
    FilterBuscarRecetaPipe,
    FilterBuscarLocalidadPipe,
    CatalogoComponent,
    HomeComponent,
    NavbarComponent,
    DetallePlatoComponent,
    ModalloginComponent,
    ModalregistroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
		AngularFireDatabaseModule,
		AngularFireStorageModule
  ],
  providers: [AngularFireAuth, AngularFirestore],
  bootstrap: [AppComponent],
})
export class AppModule {}
