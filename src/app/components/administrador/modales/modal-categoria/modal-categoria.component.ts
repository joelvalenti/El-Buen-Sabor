import { Categoria } from './../../../../models/Categoria';
import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-modal-categoria',
  templateUrl: './modal-categoria.component.html',
  styleUrls: ['./modal-categoria.component.css']
})
export class ModalCategoriaComponent implements OnInit {

  
  public localData: any;
  public action: string;
  public form: FormGroup;

  constructor(public dialogRef: MatDialogRef<ModalCategoriaComponent>,
    public formBuilder: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Categoria, private datePipe: DatePipe) {
    this.localData = { ...data };
  }

  ngOnInit(): void {
    this.buildForm();
    this.setAction();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      id: [this.localData.id],
      nombre: [this.localData.nombre, [Validators.required]],
      descripcion: [this.localData.descripcion, [Validators.required]],
    });
    
  }

  setAction() {
    this.action = (this.localData.id) ? 'Editar' : 'Añadir';
  }

  onAction() {
    this.dialogRef.close({ event: this.action, data: this.form.value });
  }

  onCancel() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  public errorHandling = (control: string, error: string) => {
    return this.form.controls[control].hasError(error);
  }


}
