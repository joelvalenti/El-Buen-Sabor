import { Component, OnInit, Input, Output, ElementRef, ViewChild } from '@angular/core';
import { Plato } from '../../models/plato';
import { PlatoService } from '../../services/allServices/plato.service';
import { UsuarioService } from '../../services/allServices/usuario.service';
import { RolesService } from '../../services/allServices/roles.service';
//Importaciones para utilizar Firebase
import { AngularFireStorage } from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private servicio : PlatoService, private servfire : UsuarioService,
              private servroles: RolesService, private storage : AngularFireStorage) { }
  
  platos : Plato [] = [];
  //variables para subida de imagenes
  uploadPercent : Observable<number>;
  urlImage : Observable<string>;
  urlString : string;
  @ViewChild('imagenPlato')  imagenPlato : ElementRef;

  ngOnInit(): void {
    this.traerPlatos();
  }

  traerPlatos(){
    this.servicio.getOne(1).subscribe(
      res => {
        this.platos.push(res);
      }, err =>{
        console.log('error');
      }
    );
    this.servicio.getOne(3).subscribe(res => {
      this.platos.push(res);
    }, err =>{
      console.log('error');
    });
    this.servicio.getOne(2).subscribe(res => {
      this.platos.push(res);
    }, err =>{
      console.log('error');
    });
  }

  onUpload(e){
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `upload/foto_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    //Imagen subida, ahora recuperamos la imagen
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(
      finalize( ()=> this.urlImage = ref.getDownloadURL())
    ).subscribe( 
    );
  }

  verImagen(){
    let hola = '';
    hola = this.imagenPlato.nativeElement.value;
    alert(hola);
    console.log('url ', hola);
    this.urlString = '';
  }
}
