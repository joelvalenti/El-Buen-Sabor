import { Usuario } from './../../../../models/Usuario';
import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-modal-usuario',
  templateUrl: './modal-usuario.component.html',
  styleUrls: ['./modal-usuario.component.css']
})
export class ModalUsuarioComponent implements OnInit {

  public localData: any;
  public action: string;
  public form: FormGroup;
  disableSelect = true;
  rolGuardado:String;
  opciones:String;

  constructor(public dialogRef: MatDialogRef<ModalUsuarioComponent>,
    public formBuilder: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Usuario, private datePipe: DatePipe) {
    this.localData = { ...data };
  }

  ngOnInit(): void {
    this.buildForm();
    this.setAction();
    this.cargarAjustes();
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
      rol: [this.localData.rol],
      esClienteOpciones:[this.opciones]
    });
    
  }

  setAction() {
    this.action = (this.localData.id) ? 'Editar' : 'Añadir';
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

  cargarAjustes(){
    if(this.form.controls['rol'].value!=null){
      this.rolGuardado=this.form.controls['rol'].value;
      this.form.controls['esCliente'].setValue(false);
      this.form.controls['esClienteOpciones'].setValue("false");
    }else{
      this.form.controls['esClienteOpciones'].setValue("true");
      this.form.controls['esCliente'].setValue(true);
    }
  }

  dS(o:boolean){
    this.disableSelect=o;
    if(o){
      this.form.controls['esCliente'].setValue(true);
      this.form.controls['esClienteOpciones'].setValue("true");
      this.form.controls['rol'].setValue(null);
    }else{
      this.form.controls['rol'].setValue(this.rolGuardado);
      this.form.controls['esClienteOpciones'].setValue("false");
      this.form.controls['esCliente'].setValue(false);
    }
  }

}
