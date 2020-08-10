import { Component, OnInit, Input } from '@angular/core';
import { DetalleService } from '../../services/allServices/detalle.service';
import { PlatoService } from '../../services/allServices/plato.service';
import { PedidoService } from '../../services/allServices/pedido.service';

@Component({
  selector: 'app-comanda',
  templateUrl: './comanda.component.html',
})
export class ComandaComponent implements OnInit {
  @Input() comanda;
  @Input() delivery;
  @Input() tipoPago;
  @Input() total;
  productos = [];
  tiempoRestante = 0;
  cantidad = [];
  idDetalle = 0;

  constructor(
    private detalleService: DetalleService,
    private platoService: PlatoService,
    private pedidoService: PedidoService
  ) {}

  ngOnInit(): void {
    if (this.delivery) {
      this.cargarTabla(false);
    } else {
      this.cargarTabla(true);
      this.disminuirTiempo();
    }
  }

  calcularTiempoRestante(tiempo: number): void {
    if (this.tiempoRestante < tiempo) {
      this.tiempoRestante = tiempo;
    }
  }
  disminuirTiempo(): void {
    const interval = setInterval(() => {
      this.tiempoRestante -= 1;
      if (this.tiempoRestante === 0) {
        this.pedidoService.updateEstado(1, this.comanda).subscribe();
        this.cancelarInterval(interval);
      }
    }, 60000);
  }
  cancelarInterval(interval: any): void {
    clearInterval(interval);
  }
  cargarTabla(tiempo: boolean): void {
    this.detalleService
      .buscarPorPedido(this.comanda.id)
      .subscribe((detalles) => {
        detalles.forEach((detalle) => {
          this.detalleService.getOne(detalle.id).subscribe((detalleData) => {
            this.platoService
              .getOne(detalleData.plato.id)
              .subscribe((plato) => {
                if (plato.nombre !== 'Plato Vacio') {
                  this.productos.push(plato);
                  this.cantidad.push(detalleData.cantidad);
                  if (tiempo) {
                    this.calcularTiempoRestante(plato.tiempoPreparacion);
                  }
                }
              });
          });
        });
      });
  }
  pedidoEntregado(): void {
    this.pedidoService.updateEstado(6, this.comanda).subscribe();
  }
}