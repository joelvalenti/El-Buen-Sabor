import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-cocina',
  templateUrl: './cocina.component.html',
  styleUrls: ['./cocina.component.css'],
})
export class CocinaComponent implements OnInit {
  comandas = [];
  recetas = [];

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    setInterval(() => {
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
                  this.comandas.splice(index, 1);
                  break;
                }
              }
            }
          });
        });
      });
    }, 5000);
  }
}
