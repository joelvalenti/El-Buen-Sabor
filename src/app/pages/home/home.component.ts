import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Plato } from '../../models/plato';
import { PlatoService } from '../../services/allServices/plato.service';
import { UsuarioService } from '../../services/allServices/usuario.service';
import { RolesService } from '../../services/allServices/roles.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private servicio : PlatoService, private servfire : UsuarioService, private servroles: RolesService) { }
  
  platos : Plato [] = [];

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

}
