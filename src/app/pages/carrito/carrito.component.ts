import { Pedido } from 'src/app/models/Pedido';
import { PedidoService } from 'src/app/services/allServices/pedido.service';
import { SweetAlertsService } from './../../services/allServices/sweet-alerts.service';
import { UsuarioService } from './../../services/allServices/usuario.service';
import { RolesService } from './../../services/allServices/roles.service';
import { Usuario } from 'src/app/models/Usuario';
import { DomicilioService } from './../../services/allServices/domicilio.service';
import { DetalleService } from './../../services/allServices/detalle.service';
import { Domicilio } from './../../models/Domicilio';
import { Detalle } from './../../models/Detalle';
import { Component, OnInit, Input } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})

export class CarritoComponent implements OnInit {

  public detalles: Detalle[] = [];
  domicilios: Domicilio[];
  public idPersona: number;
  public flagRadio = true;
  usuario: Usuario;
  public pedidos: Pedido[] = [];
  public detalleSeleccionado: Detalle = {
    id: 0,
    cantidad: 0,
    plato: null,
    insumo: null,
    eliminado: false
  };

  @Input() set id(valor: number) {
    if (valor) {
      this.idPersona = this.usuario.id;
    }
  }

  constructor(private detalleService: DetalleService, private rolesService: RolesService,
    private usuarioService: UsuarioService, private servicioDomicilio: DomicilioService,
    private pedidoService: PedidoService, private alertsService: SweetAlertsService) { }

  ngOnInit() {
    this.isAuth();
  }

  isAuth() {
    this.usuarioService.isAuth().subscribe(res => {
      const email = res.email;
      this.rolesService.getEmail(email).subscribe(res => {
        this.usuario = res;
        this.getAllDomiciliosXUsuario();
        this.getPedidosXUsuario();
      })
    });
  }

  getPedidosXUsuario() {
    this.pedidoService.getPedidoEstado(this.usuario.id, 7).subscribe(res => {
      this.pedidos = res;
      res.forEach(element => {
        this.getDetallesXPedido(element.id);
      });
    },
      () => {
        this.alertsService.errorAlert('Opss... :(', 'No se pudo recolectar la información del carrito');
      });
  }

  getDetallesXPedido(id: number) {
    this.detalleService.buscarPorPedido(id).subscribe(res => {
      this.detalles = res;
    },
      () => {
        this.alertsService.errorAlert('Opss... :(', 'No se pudo recolectar la información del carrito');
      });
  }

  getTotalNeto(): number {
    let totalNeto = 0;
    for (let i = 0; i < this.detalles.length; i++) {
      let precioTotalxProducto = this.detalles[i].plato.precioVenta * this.detalles[i].cantidad;
      totalNeto += precioTotalxProducto;
    }
    return totalNeto;
  }

  getTotalFinal(): number {
    let totalNeto = this.getTotalNeto();
    let totalFinal = totalNeto - totalNeto * 0.1; //Con 10% de descuento.
    if (this.flagRadio) {
      return totalNeto;
    } else {
      return totalFinal;
    }
  }

  delete(detalle: Detalle) {
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
        this.detalleService.delete(detalle.id).subscribe(
          () => {
            const indexDetalle = this.detalles.indexOf(detalle);
            this.detalles.splice(indexDetalle, 1);
          })
      }
    }).catch(() => {
      this.alertsService.errorAlert('Opps... :(', 'No se pudo eliminar el registro');
    })
  }

  onPreUpdate(detalle: Detalle) {
    this.detalleSeleccionado = detalle;
  }

  onRadioChange(value) {
    (value == "local") ? this.flagRadio = false : this.flagRadio = true;
  }

  //Seleccionar direccion (Paso 2)
  getAllDomiciliosXUsuario() {
    this.servicioDomicilio.buscarporUsuario(this.usuario.id).subscribe(res => {
      this.domicilios = res;
    })
  }

}