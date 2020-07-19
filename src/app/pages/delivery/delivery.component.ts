import { Component, OnInit } from '@angular/core';
import { LocalidadService } from '../../services/localidad.service';
import { PedidoService } from '../../services/pedido.service';
import { FacturaService } from '../../services/factura.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
})
export class DeliveryComponent implements OnInit {
  pedidos = [];
  filterB = '';
  localidades = [];
  pedidosAceptados = [];
  tipoPago = [];
  total = [];

  constructor(
    private localidadService: LocalidadService,
    private pedidoService: PedidoService,
    private facturaService: FacturaService
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
    this.pedidoService.updateEstado(4, pedido).subscribe();
    this.pedidosAceptados.push(pedido);
    this.pedidos.splice(index, 1);
  }
  cargarLocalidades(): void {
    this.localidadService.getAll().subscribe((localidades) => {
      this.localidades = localidades;
    });
  }
  cargarPedidos(): void {
    this.pedidoService.getPedidos().subscribe((pedidos) => {
      pedidos.forEach((pedidoU) => {
        if (pedidoU.envioDelivery) {
          this.pedidoService.getOne(pedidoU.id).subscribe((pedi) => {
            if (pedi.estado.nombre === 'Terminado') {
              if (pedidos.length === 0) {
                this.pedidosUnit(pedi);
              } else {
                let bool = true;
                for (const pedidoUnitario of this.pedidos) {
                  if (pedidoUnitario.id === pedi.id) {
                    bool = false;
                    break;
                  }
                }
                for (const pedidoUnitario of this.pedidosAceptados) {
                  if (pedidoUnitario.id === pedi.id) {
                    bool = false;
                    break;
                  }
                }
                if (bool) {
                  this.pedidosUnit(pedi);
                }
              }
            }
            if (pedi.estado.nombre === 'Entregado') {
              const indes = this.pedidosAceptados.indexOf(pedi);
              if (indes) {
                this.pedidosAceptados.splice(indes, 1);
              }
            }
          });
        }
      });
    });
  }
  pedidosUnit(pedidoU: any): void {
    this.facturaService.getAll().subscribe((facturas) => {
      facturas.forEach((factura) => {
        if (factura.pedido.id === pedidoU.id) {
          this.total.push(factura.total);
          this.tipoPago.push(factura.tipoPago);
          this.pedidos.push(pedidoU);
        }
      });
    });
  }
}
