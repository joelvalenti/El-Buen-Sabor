import { Component, OnInit } from '@angular/core';
import { LocalidadService } from '../../services/allServices/localidad.service';
import { PedidoService } from '../../services/allServices/pedido.service';
import { FacturaService } from '../../services/allServices/factura.service';

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

  aceptarPedido(index: number): void {
    const pedido = this.pedidos[index];
    this.pedidoService.updateEstado(4, pedido).subscribe(() => {
      this.pedidosAceptados.push(pedido);
      this.pedidos.splice(index, 1);
    });
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
                this.pedidosUnit(pedi, true);
              } else {
                let bool = true;
                for (const pedidoUnitario of this.pedidos) {
                  if (pedidoUnitario.id === pedi.id) {
                    bool = false;
                    break;
                  }
                }
                if (bool) {
                  this.pedidosUnit(pedi, true);
                }
              }
            } else if (pedi.estado.nombre === 'Facturado') {
              this.pedidosAceptados.forEach((pedidUnit, index) => {
                if (pedidUnit.id === pedi.id) {
                  this.pedidosAceptados.splice(index, 1);
                }
              });
            } else if (pedi.estado.nombre === 'En Delivery') {
              if (pedidos.length === 0) {
                this.pedidosUnit(pedi, false);
              } else {
                let bool = true;
                for (const pedidoUnitario of this.pedidosAceptados) {
                  if (pedidoUnitario.id === pedi.id) {
                    bool = false;
                    break;
                  }
                }
                if (bool) {
                  this.pedidosUnit(pedi, false);
                }
              }
            }
          });
        }
      });
    });
  }
  pedidosUnit(pedidoU: any, bool: boolean): void {
    this.facturaService.getAll().subscribe((facturas) => {
      facturas.forEach((factura) => {
        if (factura.pedido.id === pedidoU.id) {
          this.total.push(factura.total);
          this.tipoPago.push(factura.tipoPago);
          if (bool) {
            this.pedidos.push(pedidoU);
          } else {
            this.pedidosAceptados.push(pedidoU);
          }
        }
      });
    });
  }
}
