import { Component, OnInit, Input } from '@angular/core';
import { PedidoService } from '../../services/pedido.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-comanda',
  templateUrl: './comanda.component.html',
  styleUrls: ['./comanda.component.css'],
})
export class ComandaComponent implements OnInit {
  @Input() comanda;
  productos = [];
  tiempoRestante = 0;

  // Prueba
  pruebas = {
    detalle: [
      {
        cantidad: 2,
        plato: { id: 1, nombre: 'Pizza', tiempo_preparacion: 5 },
        insumo: null,
      },
      {
        cantidad: 3,
        plato: null,
        insumo: { id: 2, nombre: 'Cubierto', cantidad: 2 },
      },
      {
        cantidad: 5,
        plato: {
          id: 2,
          nombre: 'Hamburguesa',
          cantidad: 2,
          tiempo_preparacion: 7,
        },
        insumo: null,
      },
    ],
  };
  pruebas2 = {
    detalle: [
      {
        cantidad: 2,
        plato: null,
        insumo: { id: 3, nombre: 'Vasos', cantidad: 5 },
      },
      {
        cantidad: 1,
        plato: {
          id: 3,
          nombre: 'Pancho',
          cantidad: 3,
          tiempo_preparacion: 5,
        },
        insumo: null,
      },
      {
        cantidad: 9,
        plato: null,
        insumo: { id: 3, nombre: 'Vasos', cantidad: 5 },
      },
    ],
  };
  constructor(private pedidoService: PedidoService) {}
  ngOnInit(): void {
    this.pruebas.detalle.forEach((detalle) => {
      if (detalle.insumo == null) {
        this.productos.push({
          id: detalle.plato.id,
          nombre: detalle.plato.nombre,
          cantidad: detalle.cantidad,
        });
        this.calcularTiempoRestante(detalle.plato.tiempo_preparacion);
      }
    });
    // this.comanda.detalle.forEach((detalle) => {
    //   if (detalle.insumo == null) {
    //     this.productos.push({
    //       id: detalle.plato.id,
    //       nombre: detalle.plato.nombre,
    //       cantidad: detalle.cantidad,
    //     });
    //     this.calcularTiempoRestante(detalle.plato.tiempo_preparacion);
    //   }
    // });
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
        this.cancelarInterval(interval);
      }
    // }, 60000);
    }, 1000);
  }
  cancelarInterval(interval: any): void {
    clearInterval(interval);
  }
}
