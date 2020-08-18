import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../services/allServices/pedido.service';
import { DetalleService } from '../../services/allServices/detalle.service';
import { InsumoService } from '../../services/allServices/insumo.service';
import { PlatoService } from '../../services/allServices/plato.service';

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
    this.pedidoService.getPedidos().subscribe((pedidos) => {
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
                this.detalleService
                  .buscarPorPedido(this.comandas[index].id)
                  .subscribe((detalles) => {
                    detalles.forEach((detalle) => {
                      this.platoService
                        .getOne(detalle.plato.id)
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
      this.detalleService.buscarPorPedido(com.id).subscribe((cop) => {
        cop.forEach((element) => {
          let bolean = false;
          for (const res of this.recetas) {
            if (res.nombre === element.plato.nombre) {
              bolean = true;
              break;
            }
          }
          if (!bolean) {
            if (element.plato.nombre !== 'Plato Vacio') {
              this.platoService.getOne(element.plato.id).subscribe((plat) => {
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
