import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Output() eliminarComanda = new EventEmitter();
  productos = [];
  cantidad = [];
  idDetalle = 0;

  constructor(
    private detalleService: DetalleService,
    private platoService: PlatoService,
    private pedidoService: PedidoService
  ) {}

  ngOnInit(): void {
    this.cargarTabla();
  }

  cancelarInterval(interval: any): void {
    clearInterval(interval);
  }
  cargarTabla(): void {
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
                }
              });
          });
        });
      });
  }
  pedidoEntregado(): void {
    this.pedidoService.updateEstado(6, this.comanda).subscribe();
  }
  terminarPedido(): void {
    this.pedidoService.updateEstado(1, this.comanda).subscribe();
    this.onEliminarComanda(this.comanda.id);
  }

  onEliminarComanda(id: number): void {
    this.eliminarComanda.emit(id);
  }
}
