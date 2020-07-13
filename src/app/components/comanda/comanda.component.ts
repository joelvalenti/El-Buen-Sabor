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
    this.cargarTabla();
    this.disminuirTiempo();
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

  cargarTabla(): void {
    this.comanda.detalle.forEach((detalle) => {
      this.detalleService.getOne(detalle.id).subscribe((detalleData) => {
        this.platoService.getOne(detalleData.plato.id).subscribe((plato) => {
          if (plato.nombre !== 'Plato Vacio') {
            this.productos.push(plato);
            this.cantidad.push(detalleData.cantidad);
            this.calcularTiempoRestante(plato.tiempoPreparacion);
          }
        });
      });
    });
  }
}
