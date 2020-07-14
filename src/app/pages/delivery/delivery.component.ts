import { Component, OnInit } from '@angular/core';
import { LocalidadService } from '../../services/localidad.service';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
})
export class DeliveryComponent implements OnInit {
  pedidos = [];
  filterB = '';
  localidades = [];
  pedidosAceptados = [];

  constructor(
    private localidadService: LocalidadService,
    private pedidoService: PedidoService
  ) {}

  ngOnInit(): void {
    this.cargarLocalidades();
    setInterval(() => {
      this.cargarPedidos();
    }, 5000);
  }

  cerrarSesion(): void {
    alert('Cerrar Sesion');
  }
  aceptarPedido(index: number): void {
    const pedido = this.pedidos[index];
    this.pedidosAceptados.push(pedido);
    this.pedidos.splice(index, 1);
  }
  cargarLocalidades(): void {
    this.localidadService.getAll().subscribe((localidades) => {
      this.localidades = localidades;
    });
  }
  cargarPedidos(): void {
    this.pedidoService.getAll().subscribe((pedidos) => {
      pedidos.forEach((pedidoU) => {
        if (pedidoU.envioDelivery) {
          if (pedidos.length === 0) {
            this.pedidosUnit(pedidoU);
          } else {
            let bool = true;
            for (const pedidoUnitario of this.pedidos) {
              if (pedidoUnitario.id === pedidoU.id) {
                bool = false;
                break;
              }
            }
            for (const pedidoUnitario of this.pedidosAceptados) {
              if (pedidoUnitario.id === pedidoU.id) {
                bool = false;
                break;
              }
            }
            if (bool) {
              this.pedidosUnit(pedidoU);
            }
          }
        }
      });
    });
  }
  pedidosUnit(pedidoU: any): void {
    this.pedidoService.getOne(pedidoU.id).subscribe((ped) => {
      this.pedidos.push(ped);
    });
  }
}
