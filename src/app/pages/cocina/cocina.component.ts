import { Component, OnInit, Input } from '@angular/core';
import { PedidoService } from '../../services/allServices/pedido.service';
import { DetalleService } from '../../services/allServices/detalle.service';
import { InsumoService } from '../../services/allServices/insumo.service';
import { PlatoService } from '../../services/allServices/plato.service';
import { Plato } from '../../models/Plato';
import { Pedido } from '../../models/Pedido';
import { Detalle } from '../../models/Detalle';

@Component({
  selector: 'app-cocina',
  templateUrl: './cocina.component.html',
})
export class CocinaComponent implements OnInit {
  comandas: Pedido[] = [];
  recetas: Plato[] = [];
  filterB = '';
  modalNombre = '';
  modalDetalle = [];
  spinner = true;
  detalles: Detalle[] = [];
  platos: Plato[] = [];

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
        let bol = true;
        for (const comUnit of this.comandas) {
          if (pedido.id === comUnit.id) {
            bol = false;
            break;
          }
        }
        if (bol) {
          this.pedidoService.getOne(pedido.id).subscribe((pedidoUnit) => {
            if (pedidoUnit.estado.nombre === 'En Preparacion') {
              this.comandas.push(pedidoUnit);
            }
          });
        }
      });
    });
    this.cargarRecetas();
    this.comandas.length > 0 ? (this.spinner = false) : (this.spinner = true);
  }
  cargarRecetas(): void {
    this.comandas.forEach((com) => {
      this.detalleService
        .buscarPorPedido(com.id)
        .subscribe((cop: Detalle[]) => {
          cop.forEach((algo: Detalle) => {
            if (this.detalles.length === 0) {
              this.detalles.push(algo);
            } else {
              this.detalles.forEach((datalle) => {
                if (algo.id !== datalle.id) {
                  this.detalles.push(algo);
                }
              });
            }
          });
        });
    });
    this.detalles.forEach((deta1) => {
      if (this.platos.length === 0) {
        this.platos.push(deta1.plato);
      } else {
        this.platos.forEach((plato1) => {
          if (deta1.plato.nombre !== plato1.nombre) {
            this.platos.push(deta1.plato);
          }
        });
      }
    });
    this.platos.forEach((platoU) => {
      this.platoService.getOne(platoU.id).subscribe((plat: Plato) => {
        this.recetas.push(plat);
      });
    });
  }
  eliminarComanda(id: number): void {
    for (let indxCom = 0; indxCom < this.comandas.length; indxCom++) {
      if (this.comandas[indxCom].id === id) {
        this.detalleService
          .buscarPorPedido(this.comandas[indxCom].id)
          .subscribe((detalles) => {
            detalles.forEach((detalle) => {
              this.platoService.getOne(detalle.plato.id).subscribe((plato) => {
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
        this.comandas.splice(indxCom, 1);
        break;
      }
    }
  }
}
