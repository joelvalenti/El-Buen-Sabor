import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from '../../services/allServices/usuario.service';
import { RolesService } from '../../services/allServices/roles.service';
import { Router } from '@angular/router';
import { window } from 'rxjs/operators';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  //constructor
  constructor(private servicio:UsuarioService,
              private roles : RolesService ,
              private router:Router) { }

  //atributos y variables
  public isLogged : boolean = false;
  @Input() rol = ' ';

  ngOnInit(): void {
    this.isLoggedMethod();
    if(this.rol == ' '){
      this.consultarRol();
    }
  }

  consultarRol(){
    console.log('entra en consultarRol');
    this.servicio.isAuth().subscribe( user => {
      if(user != null){
        this.isLogged = true;
        if(this.rol == ' '){
          this.roles.getEmail(user.email).subscribe(
            res=>{
              this.rol = res.rol;
              console.log('se setea el rol');
            },
            err=>{
              console.log(':C');
            }
          );
        }
      }else{
        this.rol=' ';
      }
    });
  }

  isLoggedMethod(){
    this.servicio.isAuth().subscribe( user => {
        if(user != null){
          this.isLogged = true;
        }else{
          this.rol=' ';
        }
      });
  }

  onLogout(){
    this.servicio.logoutUser();
    this.isLogged = false;
    this.router.navigate(['/']);
    this.rol=' ';
  }

  inputlistener(parameter: any){
      console.log('esto se ejecuto: ', parameter);
      this.rol = parameter;
  }

  esquere(){
    console.log('ROL DEL USER ACTUAL: ', this.rol);
  }

  isAuth(){
    this.servicio.isAuth().subscribe(res =>{
      console.log('display name', res.displayName);
      console.log('email', res.email);
      console.log('res completa', res);
    });
  }
}
