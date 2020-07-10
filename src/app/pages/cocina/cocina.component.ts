import { Component, OnInit } from '@angular/core';
import { FacturaService } from '../../services/factura.service';

@Component({
  selector: 'app-cocina',
  templateUrl: './cocina.component.html',
  styleUrls: ['./cocina.component.css'],
})
export class CocinaComponent implements OnInit {
  constructor(private facturaService: FacturaService) {}
  public comandas = [];
  ngOnInit(): void {
    console.log(this.facturaService.getAll());
  }
}
