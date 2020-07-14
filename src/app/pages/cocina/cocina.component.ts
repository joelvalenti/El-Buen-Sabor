import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../services/pedido.service';
import { DetalleService } from '../../services/detalle.service';
import { InsumoService } from '../../services/insumo.service';
import { PlatoService } from '../../services/plato.service';

@Component({
  selector: 'app-cocina',
  templateUrl: './cocina.component.html',
})
export class CocinaComponent implements OnInit {
  comandas = [];
  recetas = [];
  filterB = '';
  modalNombre = '';
  modalDetalle = [];
  spinner = true;

  constructor(
    private pedidoService: PedidoService,
    private detalleService: DetalleService,
    private insumoService: InsumoService,
    private platoService: PlatoService
  ) {}

  ngOnInit(): void {
    setInterval(() => {
      this.cargarComandas();
    }, 5000);
  }

  modalDatos(nombre: string, detalle: any): void {
    this.modalNombre = nombre;
    this.modalDetalle = detalle;
  }
  cargarComandas(): void {
    this.pedidoService.getAll().subscribe((pedidos) => {
      pedidos.forEach((pedido) => {
        this.pedidoService.getOne(pedido.id).subscribe((pedidoUnit) => {
          if (pedidoUnit.estado.nombre === 'En Preparacion') {
            if (this.comandas.length === 0) {
              this.comandas.push(pedidoUnit);
            } else {
              let bol = false;
              for (const com of this.comandas) {
                if (com.id === pedidoUnit.id) {
                  bol = true;
                  break;
                }
              }
              if (!bol) {
                this.comandas.push(pedidoUnit);
              }
            }
          }
          if (pedidoUnit.estado.nombre === 'Terminado') {
            for (let index = 0; index < this.comandas.length; index++) {
              if (this.comandas[index].id === pedidoUnit.id) {
                this.comandas[index].detalle.forEach((detalle) => {
                  this.detalleService
                    .getOne(detalle.id)
                    .subscribe((detalleData) => {
                      this.platoService
                        .getOne(detalleData.plato.id)
                        .subscribe((plato) => {
                          if (plato.nombre !== 'Plato Vacio') {
                            this.recetas.forEach((rec, ind) => {
                              if (plato.nombre === rec.nombre) {
                                this.recetas.splice(ind, 1);
                              }
                            });
                          }
                        });
                    });
                });
                this.comandas.splice(index, 1);
                break;
              }
            }
          }
        });
      });
    });
    this.cargarRecetas();
    this.comandas.length > 0 ? (this.spinner = false) : (this.spinner = true);
  }
  cargarRecetas(): void {
    this.comandas.forEach((com) => {
      com.detalle.forEach((element) => {
        this.detalleService.getOne(element.id).subscribe((detal) => {
          // if (detal.insumo.esInsumo) {
          //   this.insumoService.getOne(detal.insumo.id).subscribe((ins) => {
          //     this.recetas.push(ins);
          //   });
          // }
          let bolean = false;
          for (const res of this.recetas) {
            if (res.nombre === detal.plato.nombre) {
              bolean = true;
              break;
            }
          }
          if (!bolean) {
            if (detal.plato.nombre !== 'Plato Vacio') {
              this.platoService.getOne(detal.plato.id).subscribe((plat) => {
                this.recetas.push(plat);
              });
            }
          }
        });
      });
    });
  }
  cerrarSesion(): void {
    alert('Cerrar Sesion');
  }
}
