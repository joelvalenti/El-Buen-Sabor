import { Pedido } from './../../models/Pedido';
import { PedidoService } from 'src/app/services/allServices/pedido.service';
import { SweetAlertsService } from './../../services/allServices/sweet-alerts.service';
import { Domicilio } from '../../models/Domicilio';
import { RolesService } from '../../services/allServices/roles.service';
import { LocalidadService } from '../../services/allServices/localidad.service';
import { DomicilioService } from '../../services/allServices/domicilio.service';
import { UsuarioService } from '../../services/allServices/usuario.service';
import { Usuario } from '../../models/Usuario';
import { Component, OnInit, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-pagina-perfil',
  templateUrl: './pagina-perfil.component.html',
  styleUrls: ['./pagina-perfil.component.css']
})
export class PaginaPerfilComponent implements OnInit {

  public domicilios;
  public localidades;
  indice: number;
  idP: number;
  public reformatDate;
  public fechaAux;
  public rolSeleccionado;
  public esAdministrador;
  public esAdministradorActualmente;
  pageActual: number = 1;
  public pedidosXId: Pedido[] = [];
  public pedidosXIdAux;

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
  public domicilioSeleccionado: Domicilio = {
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
      this.idP = valor;
    }
  }

  constructor(private usuarioService: UsuarioService, private rolesService: RolesService,
    private domicilioService: DomicilioService, private localidadService: LocalidadService,
    private alertsService: SweetAlertsService, private datePipe: DatePipe,
    private pedidoService: PedidoService) { }

  ngOnInit() {
    this.isAuth();
    this.getLocalidades();
  }

  isAuth() {
    this.usuarioService.isAuth().subscribe(res => {
      const email = res.email;
      this.rolesService.getEmail(email).subscribe(res => {
        this.usuario = res;
        if(this.usuario.rol == 'administrador') {
          this.esAdministrador = true;
          this.esAdministradorActualmente = true;
        }
        this.reformatDate = this.datePipe.transform(this.usuario.fechaNacimiento, "yyyy-MM-dd");
        this.getAllDomiciliosXUsuario();
        this.getPedidosXId();
      })
    });
  }

  getAllDomiciliosXUsuario() {
    this.domicilioService.buscarporUsuario(this.usuario.id).subscribe(res => {
      this.domicilios = res;
    })
  }

  getLocalidades() {
    this.localidadService.getAll().subscribe(res => {
      this.localidades = res;
    })
  }

  getPedidosXId() {
    this.pedidoService.getPedidoEstado(this.usuario.id, 1).subscribe(res => {
      this.pedidosXId = res;
      this.pedidosXIdAux = res;
    },
      () => {
        this.alertsService.errorAlert('Opss..', 'No se pudo recolectar la información del carrito');
      });
  }

  onKeyFilter(value) {
    var filter = value.toLowerCase();
    var platosFiltrados = [];
    for (let i = 0; i < this.pedidosXIdAux.length; i++) {
      if (this.pedidosXIdAux[i].fecha.toLowerCase().includes(filter)) {
        platosFiltrados.push(this.pedidosXIdAux[i]);
        this.pedidosXId = platosFiltrados;
      }
    }
    if(filter == ''){
      this.pedidosXId = this.pedidosXIdAux;
    }
  }

  onDateChange(value) {
    this.fechaAux = value;
  }

  updateUsuario(usuario: Usuario) {
    this.usuario.fechaNacimiento = this.fechaAux;
    this.usuarioService.put(usuario.id, usuario).subscribe(
      () => {
        this.usuario.rol = this.rolSeleccionado;
        this.alertsService.successAlert('Datos Actualizados');
        if(this.usuario.rol != 'administrador'){
          this.esAdministrador = false;
        }
        if(this.esAdministradorActualmente == true){
          console.log('entré al if.');
          window.location.reload();
          this.esAdministradorActualmente = false;
        }
       },
      () => {
        this.alertsService.errorAlert('Opps..', 'Ocurrió un error al actualizar usuario');
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
      this.alertsService.errorAlert('Opps..', 'No se pudo eliminar el registro');
    })
  }

  onPreUpdate(domicilio: Domicilio) {
    this.domicilioSeleccionado = domicilio;
  }

  onChangeRol(event) {
    this.rolSeleccionado = event;
  }

  resetear() {
    this.domicilioSeleccionado = {
      id: 0,
      calle: '',
      numero: 0,
      eliminado: false,
      localidad: null,
      propietario: null,
      departamento: '',
      piso: ''
    };
  }

}
