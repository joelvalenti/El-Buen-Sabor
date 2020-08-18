import { SweetAlertsService } from './../../services/allServices/sweet-alerts.service';
import { Detalle } from './../../models/Detalle';
import { DetalleService } from './../../services/allServices/detalle.service';
import { CarritoComponent } from './../../pages/carrito/carrito.component';
import { Component, OnInit, ViewChild, ElementRef, Host, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-detalle',
  templateUrl: './modal-detalle.component.html',
  styleUrls: ['./modal-detalle.component.css']
})

export class ModalDetalleComponent implements OnInit {

  @ViewChild('btnClose', { static: true }) btnClose: ElementRef;

  public formDetalle: FormGroup;
  public detalle: any;
  public indice: number;

  ngOnInit() {
    this.onBuild();
  }

  constructor(private servicio: DetalleService, @Host() private tabla: CarritoComponent,
    private formBuilder: FormBuilder, private alertsService: SweetAlertsService) { }

  @Input() set detalleSeleccionado(valor) {
    this.onBuild();
    if (valor) {
      this.detalle = valor;
      this.formDetalle.patchValue({
        id: valor.id,
        cantidad: valor.cantidad,
        nombre: valor.plato.nombre,
        precioVenta: valor.plato.precioVenta
      });
    }
  }

  onBuild() {
    this.formDetalle = this.formBuilder.group({
      id: null,
      nombre: new FormControl({ value: '', disabled: true }, [Validators.required]),
      cantidad: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]),
      precioVenta: new FormControl({ value: '', disabled: true }, [Validators.required])
    });
  }

  onSave(formDetalle: FormGroup): void {
    if (formDetalle.value.id !== null) {
      this.update(formDetalle.value);
    }
    this.btnClose.nativeElement.click();
    this.tabla.indice = null;
  }

  update(detalle: Detalle) {
    this.servicio.put(detalle.id, detalle).subscribe(
      () => {
        this.alertsService.successAlert('El carrito fue actualizado con éxito.');
        this.tabla.detalles.splice(this.indice, 1, detalle);
        this.refreshCarrito();
      },
      () => {
        this.alertsService.errorAlert('Opps... :(', 'Algo salió mal actualizando el carrito');
      }
    );
  }

  refreshCarrito() {
    this.servicio.buscarPorPedido(1).subscribe(response => {
      this.tabla.detalles = response;
    });
  }

  onClose() {
    this.detalleSeleccionado = null;
  }

}