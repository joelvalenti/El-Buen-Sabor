import { Component, OnInit, Input } from '@angular/core';
import { DetalleService } from '../../services/detalle.service';
import { PlatoService } from '../../services/plato.service';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-comanda',
  templateUrl: './comanda.component.html',
})
export class ComandaComponent implements OnInit {
  @Input() comanda;
  @Input() delivery: boolean;
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
    this.comanda.detalle.forEach((detalle) => {
      this.detalleService.getOne(detalle.id).subscribe((detalleData) => {
        this.platoService.getOne(detalleData.plato.id).subscribe((plato) => {
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
  }
  pedidoEntregado(): void {
    this.pedidoService.updateEstado(6, this.comanda).subscribe();
  }
}
