import { Component, OnInit, ViewChild, ElementRef, Host, Input, Output, EventEmitter } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/allServices/usuario.service';
import { RolesService } from '../../services/allServices/roles.service';
import {NgForm} from '@angular/forms';
import { Usuario } from 'src/app/models/Usuario';

@Component({
  selector: 'app-modallogin',
  templateUrl: './modallogin.component.html',
  styleUrls: ['./modallogin.component.css']
})
export class ModalloginComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private router:Router, private authService: UsuarioService, private servicio: RolesService) { }
  public email: string = '';
  public password: string = '';
  usuarioLogeado: Usuario = {};
  nuevoUsuario : Usuario = {};

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
      this.authService.isAuth().subscribe(res=>{
        const correo = res.email;
        this.servicio.getEmail(correo).subscribe( res=>{
          console.log('Usted ya esta registrado cumpa', res);
        }, err=>{
          this.nuevoUsuario.email = correo;
            const displayName = res.displayName;
            const dnArray = displayName.split(" ");
            const first = dnArray[0];
            const last = dnArray[1];
            this.nuevoUsuario.nombre = first;
            this.nuevoUsuario.apellido = last;
            this.nuevoUsuario.Rol = 'Cliente';
            this.nuevoUsuario.esCliente = true;
            // this.nuevoUsuario.telefono = Number.parseInt(res.phoneNumber);
           //post user
            console.log('nuevo usuario que vamos a postear: ', this.nuevoUsuario);
            this.servicio.post(this.nuevoUsuario).subscribe(res =>{
            console.log('Succesfully posted', res); 
            }, 
            err=>{
              console.log('Something went wrong.'); 
            });
        });
      });
      this.btnClose.nativeElement.click();
    }).catch(err => console.log('err',err.message));
    
   this.nuevoUsuario = {};
  }

  
}
