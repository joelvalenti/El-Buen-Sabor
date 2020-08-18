import { SweetAlertsService } from './../../services/allServices/sweet-alerts.service';
import { Domicilio } from '../../models/Domicilio';
import { RolesService } from '../../services/allServices/roles.service';
import { LocalidadService } from '../../services/allServices/localidad.service';
import { DomicilioService } from '../../services/allServices/domicilio.service';
import { UsuarioService } from '../../services/allServices/usuario.service';
import { Usuario } from '../../models/Usuario';
import { Component, OnInit, Input } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pagina-perfil',
  templateUrl: './pagina-perfil.component.html',
  styleUrls: ['./pagina-perfil.component.css']
})
export class PaginaPerfilComponent implements OnInit {

  public domicilios;
  public localidades;
  indice: number;
  idP:number;
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
    rol: '',
    esCliente: true,
    telefono: 0
  }
  public domicilioSeleccionado: Domicilio ={
    id: 0,
    calle: '',
    numero: 0,
    piso: '',
    departamento: '',
    eliminado: false,
    propietario: {
      id: this.usuario.id
    },
    localidad: {
      id: null
    }
  };

  @Input() set id(valor: number) {
    if (valor) {
      this.getAllDomiciliosXUsuario();
      this.idP=valor;
    }
  }

  constructor(private usuarioService: UsuarioService, private rolesService: RolesService,
    private domicilioService: DomicilioService, private localidadService: LocalidadService,
    private alertsService: SweetAlertsService) { }

  ngOnInit() {
    this.isAuth();
    this.getAllDomiciliosXUsuario();
    this.getLocalidades();
  }

  isAuth() {
    this.usuarioService.isAuth().subscribe(res => {
      const email = res.email;
      this.rolesService.getEmail(email).subscribe(res => {
        this.usuario = res;
        this.reformatDateString(this.usuario.fechaNacimiento);
      })
    });
  }

  reformatDateString(value) {
    var b = value.split(/\D/);
    return b.reverse().join('-');
  }

  getAllDomiciliosXUsuario() {
    setTimeout(() => {
      this.domicilioService.buscarporUsuario(this.usuario.id).subscribe(res => {
        this.domicilios = res;
      })
    }, 1500);
  }

  getLocalidades() {
    this.localidadService.getAll().subscribe(res => {
      this.localidades = res;
    })
  }

  updateUsuario(usuario: Usuario) {
    this.usuarioService.put(usuario.id, usuario).subscribe(
      res => {
        this.alertsService.successAlert('El usuario fue actualizado con éxito.');
      },
      () => {
        this.alertsService.errorAlert('Opps... :(','Ocurrió un error al actualizar usuario');
      }
    );
  }

  deleteDomicilio(domicilio: Domicilio) {
    return Swal.fire({
      title: 'Proceder con la eliminación?',
      text: 'El registro no podrá recuperarse',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminalo!'
    }).then(res => {
      if (res.value) {
        Swal.fire(
          'Eliminado!',
          'Su registro ha sido eliminado!',
          'success'
        )
        this.domicilioService.delete(domicilio.id).subscribe(
          () => {
            const indexDetalle = this.domicilios.indexOf(domicilio);
            this.domicilios.splice(indexDetalle, 1);
          })
      }
    }).catch(() => {
      this.alertsService.errorAlert('Opps... :(', 'No se pudo eliminar el registro');
    })
  }

  onPreUpdate(domicilio: Domicilio) {
    this.domicilioSeleccionado = domicilio;
  }

  resetear(){
    this.domicilioSeleccionado = null;
  }

}
