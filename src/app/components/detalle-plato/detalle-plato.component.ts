import { Component, OnInit, Input  } from '@angular/core';
import { Plato } from '../../modelo/plato';
import { Detalle } from '../../modelo/detalle';
import { DetalleService } from '../../services/detalle.service';

@Component({
  selector: 'app-detalle-plato',
  templateUrl: './detalle-plato.component.html',
  styleUrls: ['./detalle-plato.component.css']
})
export class DetallePlatoComponent implements OnInit {

  constructor(private detalleServicio : DetalleService) { }

  @Input() platoDetalle : Plato = {};

   datos : Detalle[] = [];
   datosInterinos : Detalle[] = [];

  ngOnInit(): void {
  }

  traerDetalle(){
      this.detalleServicio.getAll().subscribe( res => {
        this.datos = res;
        this.datosInterinos = this.datos.filter(detalle => detalle.plato.id === this.platoDetalle.id);
        console.log('resultado', this.datosInterinos);
      }, err =>{
        console.log('hubo un error');
      }); 
  }
}
