import { InsumoService } from './../../../../services/administrador/insumo.service';
import { Insumo } from './../../../../models/Insumo';
import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-modal-ingrediente',
  templateUrl: './modal-ingrediente.component.html',
  styleUrls: ['./modal-ingrediente.component.css']
})
export class ModalIngredienteComponent implements OnInit {


  public localData: any;
  public localDataInsumo: any;
  public action: string;
  public form: FormGroup;
  public id:number;
  public plato:any;
  public um:String;
  disableSelect = true;
  opciones:String;

  constructor(public dialogRef: MatDialogRef<ModalIngredienteComponent>,
    public formBuilder: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, private datePipe: DatePipe, private service:InsumoService) {
    console.log("DATA INGREDIENTES: " + data.id + data.plato.id);
    if(data.object!=undefined){
      this.localData = data.object;
     }
      this.plato=data.plato;
      console.log(data.plato);
      this.id=data.plato.id;
      
  }

  ngOnInit(): void {
    this.getAll();
    this.buildForm();
    this.form.controls['plato'].setValue(this.plato);
    this.setAction();
  }


  getAll():void{
    this.service.buscarInsumoporCategoria().subscribe(data => {
      this.localDataInsumo = data;
    })
  }

  buildForm() {
    this.form = this.formBuilder.group({
      id: [this.localData.id],
      ingrediente: [this.localData.ingrediente],
      cantidad: [this.localData.cantidad, [Validators.required]],
      opcionesIngrediente:[this.opciones],
      unidadMedida:[this.um],
      plato:[this.localData.plato]
    });
    
  }

  setAction() {
    this.action = (this.localData.id) ? 'Editar' : 'Añadir';
  }

  onAction() {
    this.dialogRef.close({ event: this.action, data: {object:this.form.value} });
  }

  onCancel() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  public errorHandling = (control: string, error: string) => {
    return this.form.controls[control].hasError(error);
  }

  cargarIngrediente(ingrediente:Insumo,um:String):void{
    this.form.controls['ingrediente'].setValue(ingrediente);
    this.form.controls['unidadMedida'].setValue(um);
  }
  


}
