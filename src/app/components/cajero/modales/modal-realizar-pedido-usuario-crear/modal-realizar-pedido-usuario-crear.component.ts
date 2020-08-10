import { Usuario } from './../../../../models/Usuario';
import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-modal-realizar-pedido-usuario-crear',
  templateUrl: './modal-realizar-pedido-usuario-crear.component.html',
  styleUrls: ['./modal-realizar-pedido-usuario-crear.component.css']
})
export class ModalRealizarPedidoUsuarioCrearComponent implements OnInit {

  public dato: boolean;
  public usuario:Usuario;
  public localData: any={...this.usuario};
  public action: string;
  public form: FormGroup;
  public cargaCompleta: boolean = false;
  disableSelect = true;

  constructor(public dialogRef: MatDialogRef<ModalRealizarPedidoUsuarioCrearComponent>,
    public formBuilder: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: boolean, private datePipe: DatePipe) {
    this.dato = data;
  }

  ngOnInit(): void {
    this.buildForm();
    this.setAction();
    this.form.controls['esCliente'].setValue(true);
  }

  buildForm() {
    this.form = this.formBuilder.group({
      id: [this.localData.id],
      nombre: [this.localData.nombre, [Validators.required]],
      apellido: [this.localData.apellido, [Validators.required]],
      dni: [this.localData.dni, [Validators.required, , Validators.pattern(/^[0-9]\d*$/)]],
      fechaNacimiento: [this.localData.fechaNacimiento, [Validators.required]],
      telefono: [this.localData.telefono, [Validators.required, , Validators.pattern(/^[0-9]\d*$/)]],
      email: [this.localData.email, [Validators.required, Validators.email]],
      esCliente: [this.localData.esCliente, [Validators.required]],
      rol: [this.localData.Rol]
    });

  }

  setAction() {
    this.action ='Crear';
  }

  onAction() {
      this.form.controls['fechaNacimiento'].setValue(this.datePipe.transform(this.form.controls['fechaNacimiento'].value, 'yyyy-MM-dd'));
      this.dialogRef.close({ event: this.action, data: this.form.value });
  }

  onCancel() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  public errorHandling = (control: string, error: string) => {
    return this.form.controls[control].hasError(error);
  }

}
