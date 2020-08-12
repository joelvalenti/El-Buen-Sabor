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
  constructor(private servicio:UsuarioService, private roles : RolesService ,private router:Router) { }

  //atributos y variables
  public isLogged : boolean = false;
  @Input() rol = '';


  ngOnInit(): void {
    this.isLoggedMethod();
  }

  isLoggedMethod(){
    this.servicio.isAuth().subscribe( user => {
      if(user != null){
        this.isLogged = true;
      }
    });
  }

  onLogout(){
    this.servicio.logoutUser();
    this.isLogged = false;
    this.router.navigate(['/']);
  }

  mostrarInput(){
    console.log('rol ',this.rol);
  }

  inputlistener(parameter: any){
      console.log('esto se ejecuto: ', parameter);
      this.rol = parameter;
  }

  isAuth(){
    this.servicio.isAuth().subscribe(res =>{
      console.log('display name', res.displayName);
      console.log('email', res.email);
      console.log('res completa', res);
    });
  }
}
