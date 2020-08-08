import { Domicilio } from './../../models/Domicilio';
import { DomicilioService } from './../../services/domicilio.service';
import { Detalle } from './../../models/Detalle';
import { DetalleService } from './../../services/detalle.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})

export class CarritoComponent implements OnInit {

  public detalles: Detalle[] = [];
  indice: number;
  public idPersona: number;
  public flagRadio = true;
  
  public detalleSeleccionado: Detalle = {
    id: 0,
    cantidad: 0,
    plato: null,
    insumo: null,
    eliminado: false
  };

  @Input() set id(valor: number) {
    if (valor) {
      //this.getAllDomiciliosXUsuario(id);
      this.idPersona = 3;
    }
  }

  constructor(private detalleService: DetalleService, private servicioDomicilio: DomicilioService) { }

  ngOnInit() {
    this.getAllDetallesxPedido();
    this.getAllDomiciliosXUsuario();
  }

  getAllDetallesxPedido() {
    this.detalleService.buscarPorPedido(1).subscribe(response => {
      this.detalles = response;
      console.log(this.detalles);
    },
      err => {
        alert('Error al traer todos los detalles: ' + err);
      });
  }

  getTotalNeto(): number {
    let totalNeto = 0;
    for (let i = 0; i < this.detalles.length; i++) {
      let precioTotalxProducto = this.detalles[i].plato.precioVenta * this.detalles[i].cantidad;
      totalNeto += precioTotalxProducto;
    }
    return totalNeto;
  }

  getTotalFinal(): number {
    let totalNeto = this.getTotalNeto();
    let totalFinal = totalNeto - totalNeto * 0.1; //Con 10% de descuento.
    if(this.flagRadio){
      return totalNeto;
    }else{
      return totalFinal;
    }
  }

  delete(detalle: Detalle) {
    const opcion = confirm('¿Desea eliminar este registro?');
    if (opcion === true) {
      this.detalleService.delete(detalle.id).subscribe(
        res => {
          alert('El registro fue eliminado con éxito');
          const indexDetalle = this.detalles.indexOf(detalle);
          this.detalles.splice(indexDetalle, 1);
        },
        err => {
          alert('Error al eliminar el registro seleccionado: ' + err);
        });
    }
  }

  onPreUpdate(detalle: Detalle) {
    this.detalleSeleccionado = detalle;
    this.indice = this.detalles.indexOf(detalle);
  }

  onRadioChange(value){
    console.log("El radio button seleccionado es: ", value);
    if(value==="local"){
      this.flagRadio = false;
    }else{
      this.flagRadio = true;
    }
  }

  //Seleccionar direccion (Paso 2)

  domicilios: Domicilio[];

  getAllDomiciliosXUsuario(){
    //obtener el id del usuario logeado...
    this.servicioDomicilio.buscarPorUsuario(3).subscribe( response => {
      this.domicilios = response;
    },
    err =>{
      console.log("Error en get all domicilios - Carrito");
    })
  }

}