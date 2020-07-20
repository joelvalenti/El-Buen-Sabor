import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../services/pedido.service';
import { DetalleService } from '../../services/detalle.service';
import { FacturaService } from '../../services/factura.service';
import { UsuarioService } from '../../services/usuario.service';
import { InsumoService } from '../../services/insumo.service';
import { PlatoService } from '../../services/plato.service';

@Component({
  selector: 'app-cajero',
  templateUrl: './cajero.component.html',
  styleUrls: ['./cajero.component.css'],
})
export class CajeroComponent implements OnInit {
  facturas = [];
  detalles = [];
  constructor(
    private pedidoService: PedidoService,
    private detalleService: DetalleService,
    private facturaService: FacturaService,
    private usuarioService: UsuarioService,
    private insumoService: InsumoService,
    private platoService: PlatoService
  ) {}

  ngOnInit(): void {
    setInterval(() => {
      this.cargarFacturas();
    }, 5000);
  }

  cargarFacturas(): void {
    this.facturaService.getAll().subscribe((facturas) => {
      facturas.forEach((fact) => {
        if (this.facturas.length === 0) {
          this.cargarUnPedido(fact.id, false, 0);
        } else {
          let bol = false;
          let idx: number;
          for (let indx = 0; indx < this.facturas.length; indx++) {
            if (this.facturas[indx].id === fact.id) {
              bol = true;
              idx = indx;
              break;
            }
          }
          if (bol && this.facturas.length > 0) {
            this.cargarUnPedido(fact.id, true, idx);
          }
          if (!bol) {
            this.cargarUnPedido(fact.id, false, 0);
          }
        }
      });
    });
  }
  cargarUnPedido(id: number, bool: boolean, idx: number): void {
    this.facturaService.getOne(id).subscribe((ped) => {
      this.pedidoService.getOne(ped.pedido.id).subscribe((cop) => {
        if (
          cop.estado.nombre !== 'Cancelado' &&
          cop.estado.nombre !== 'En Aprobacion'
        ) {
          ped.pedido = cop;
          this.usuarioService.getOne(ped.id).subscribe((us) => {
            ped.usuario = us;
          });
          if (bool) {
            this.facturas.splice(idx, 1, ped);
          } else {
            this.facturas.push(ped);
          }
        }
      });
    });
  }
  modalDatos(id: number): void {
    this.detalleService.buscarPorPedido(id).subscribe((detalles) => {
      detalles.forEach((det) => {
        this.insumoService.getOne(det.insumo.id).subscribe((ins) => {
          if (ins.nombre !== 'Insumo Vacio') {
            this.detalles.push(ins);
          }
        });
        this.platoService.getOne(det.plato.id).subscribe((pla) => {
          if (pla.nombre !== 'Plato Vacio') {
            this.detalles.push(pla);
          }
        });
      });
    });
  }
  limpiarDatos(): void {
    this.detalles = [];
  }
}
