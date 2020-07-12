import { Component, OnInit, Input } from '@angular/core';
import { DetalleService } from '../../services/detalle.service';
import { PlatoService } from '../../services/plato.service';

@Component({
  selector: 'app-comanda',
  templateUrl: './comanda.component.html',
  styleUrls: ['./comanda.component.css'],
})
export class ComandaComponent implements OnInit {
  @Input() comanda;
  productos = [];
  tiempoRestante = 0;

  constructor(
    private detalleService: DetalleService,
    private platoService: PlatoService
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
        this.cancelarInterval(interval);
      }
    }, 60000);
  }
  cancelarInterval(interval: any): void {
    clearInterval(interval);
  }
  cargarTabla(): void {
    setInterval(() => {
      this.comanda.detalle.forEach((detalle) => {
        // console.log('detalle:', detalle);
        this.detalleService.getOne(detalle.id).subscribe((detalleData) => {
          // console.log('detalleData:', detalleData);
          if (detalleData.insumo.id !== 12) {
            this.platoService
              .getOne(detalleData.plato.id)
              .subscribe((plato) => {
                if (this.productos.length === 0) {
                  this.productos.push({
                    id: plato.id,
                    nombre: plato.nombre,
                    cantidad: detalleData.cantidad,
                  });
                  this.calcularTiempoRestante(plato.tiempoPreparacion);
                } else {
                  let a = false;
                  for (let index = 0; index < this.productos.length; index++) {
                    if (this.productos[index].id === plato.id) {
                      a = false;
                    } else {
                      a = true;
                      break;
                    }
                  }
                  if (!a) {
                    // console.log('plato:', plato);
                    this.productos.push({
                      id: plato.id,
                      nombre: plato.nombre,
                      cantidad: detalleData.cantidad,
                    });
                    this.calcularTiempoRestante(plato.tiempoPreparacion);
                  }
                }
              });
          }
        });
      });
    }, 5000);
  }
}
