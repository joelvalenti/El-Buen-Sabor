import { Component, OnInit, Input  } from '@angular/core';
import { Plato } from '../../modelo/plato';
@Component({
  selector: 'app-detalle-plato',
  templateUrl: './detalle-plato.component.html',
  styleUrls: ['./detalle-plato.component.css']
})
export class DetallePlatoComponent implements OnInit {

  constructor() { }

  @Input() platoDetalle : Plato = {};
  id:number;

  ngOnInit(): void {
    
  }


  metodo(){
    console.log('dou  ', this.platoDetalle);
  }
}
