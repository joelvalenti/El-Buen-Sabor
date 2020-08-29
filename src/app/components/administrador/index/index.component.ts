import { Router } from '@angular/router';
import { RolesService } from './../../../services/allServices/roles.service';
import { UsuarioService } from 'src/app/services/allServices/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/Usuario';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexAdminComponent implements OnInit {

  constructor( private rolesService: RolesService,
    private usuarioService: UsuarioService, private router:Router) { }

    public usuario:Usuario;

  ngOnInit(): void {
    this.isAuth();
    setTimeout(() => this.ver(), 500);
    
  }


  isAuth() {
    this.usuarioService.isAuth().subscribe(res => {
      const email = res.email;
      this.rolesService.getEmail(email).subscribe(res => {
        this.usuario = res;
      })
    });
  }
public ver(){
  if(this.usuario==null){
    setTimeout(() => this.r(), 500);
  }else{
    if (this.usuario.rol!='administrador') {
      setTimeout(() => this.r(), 500);
    }
  }
}
public r(){
  this.router.navigate(['']);
  console.log("Se envio");
}

}
