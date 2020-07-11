import { Component, OnInit } from '@angular/core';
import { FacturaService } from '../../services/factura.service';

@Component({
  selector: 'app-cocina',
  templateUrl: './cocina.component.html',
  styleUrls: ['./cocina.component.css'],
})
export class CocinaComponent implements OnInit {
  comandas = [];
  prueba = [{ id: 1 }, { id: 2 }, { id: 3 }];
  constructor(private facturaService: FacturaService) {}
  ngOnInit(): void {
    // this.facturaService.getAll().subscribe((data) => {
    //   this.comandas = data;
    // });
    this.prueba.forEach((data) => {
      this.comandas.push(data);
    });
  }
}
