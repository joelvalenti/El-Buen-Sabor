import { Component, OnInit } from '@angular/core';
import { FacturaService } from '../../services/factura.service';

@Component({
  selector: 'app-cocina',
  templateUrl: './cocina.component.html',
  styleUrls: ['./cocina.component.css'],
})
export class CocinaComponent implements OnInit {
  comandas = [];
  constructor(private facturaService: FacturaService) {}
  ngOnInit(): void {
    this.facturaService.getAll().subscribe((facturas) => {
      this.comandas = facturas;
    });
  }
}
