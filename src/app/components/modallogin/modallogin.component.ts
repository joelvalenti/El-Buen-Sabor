import { Component, OnInit, ViewChild, ElementRef, Host, Input, Output, EventEmitter } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { RolesService } from '../../services/roles.service';
import {NgForm} from '@angular/forms';
import { UserInterface } from 'src/app/modelo/user';

@Component({
  selector: 'app-modallogin',
  templateUrl: './modallogin.component.html',
  styleUrls: ['./modallogin.component.css']
})
export class ModalloginComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private router:Router, private authService: UsuarioService, private servicio: RolesService) { }
  public email: string = '';
  public password: string = '';
  usuarioLogeado: UserInterface = {};


  @ViewChild('btnClose', { static: true }) btnClose: ElementRef;
  @Output() rol = new EventEmitter<string>();

  ngOnInit(): void {
  }

  onLoginRedirect():void{
    this.router.navigate(['catalogo']);
  }

  onLogin():void{
    this.authService.loginEmailUser(this.email,this.password)
    .then((res)=>{
      this.onLoginRedirect(); 
      this.btnClose.nativeElement.click();
      //comenzamos a estblecer el rol, buscando al usuario
      this.servicio.getEmail(this.email).subscribe( res =>{
        this.usuarioLogeado = res;
      }, err => {
        alert('Ocurrió un gran error');
      });
      //terminamos de usar el servicio
      this.rol.emit(this.usuarioLogeado.Rol); //esta linea emite el Rol de usuario 
    }).catch( err => console.log('err',err.message));
  }

  onLoginGoogle() : void {
    this.authService.loginGoogleUser()
    .then((res)=>{
      this.btnClose.nativeElement.click();
      this.onLoginRedirect();
    }).catch(err => console.log('err',err.message));
  }

  
}
