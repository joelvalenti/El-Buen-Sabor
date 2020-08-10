import { LocalidadService } from './../../services/allServices/localidad.service';
import { DomicilioService } from './../../services/allServices/domicilio.service';
import { UsuarioService } from './../../services/allServices/usuario.service';
import { Domicilio } from 'src/app/models/Domicilio';
import { Usuario } from './../../models/Usuario';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  public domicilios;
  public localidades;
  usuario: Usuario = {
    id: 0,
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    fechaNacimiento: null,
    eliminado: false,
    dni: 0,
    imagen: '',
    Rol: '',
    esCliente: true,
    telefono: 0
  }

  constructor(private usuarioService: UsuarioService, private domicilioService: DomicilioService, private localidadService: LocalidadService) { }

  ngOnInit(): void {
    this.getUsuario(3);
    this.getAllDomiciliosXUsuario();
    this.getLocalidades();
  }

  getUsuario(id: number){
    this.usuarioService.getOne(3).subscribe(response => {
      this.usuario = response;
    })
  }

  getAllDomiciliosXUsuario(){
    //obtener el id del usuario logeado...
    this.domicilioService.buscarporUsuario(3).subscribe( response => {
      this.domicilios = response;
    },
    err =>{
      console.log("Error en get all domicilios - usuario");
    })
  }

  getLocalidades(){
    this.localidadService.getAll().subscribe( response => {
      this.localidades = response;
    },
    err =>{
      console.log("Error en get all localidades - usuario");
    })
  }

  update(usuario: Usuario) {
    this.usuarioService.put(usuario.id, usuario).subscribe(
      res => {
        this.usuario = res;
        alert('El usuario fue actualizado con éxito');
        this.getAllDomiciliosXUsuario();
      },
      err => {
        alert('Ocurrió un error al actualizar usuario '+ err);
      }  
    );
  }

  deleteDomicilio(domicilio: Domicilio) {
    const opcion = confirm('¿Desea eliminar este registro?');
    if (opcion === true) {
      this.domicilioService.delete(domicilio.id).subscribe(
        () => {
          alert('El registro fue eliminado con éxito');
          const indexDetalle = this.domicilios.indexOf(domicilio);
          this.domicilios.splice(indexDetalle, 1);
        },
        err => {
          alert('Error al eliminar el registro seleccionado: ' + err);
        });
    }
  }

}