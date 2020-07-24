import { UnidadMedidaService } from './../../../../services/administrador/unidadMedida.service';
import { CategoriaInsumoService } from 'src/app/services/administrador/categoriaInsumo.service';
import { CategoriaInsumo } from './../../../../models/CategoriaInsumo';
import { UnidadMedida } from './../../../../models/UnidadMedida';
import { Component, OnInit, Inject, Optional, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, NgControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { Insumo } from 'src/app/models/Insumo';

@Component({
  selector: 'app-modal-insumo',
  templateUrl: './modal-insumo.component.html',
  styleUrls: ['./modal-insumo.component.css']
})
export class ModalInsumoComponent implements OnInit {

 
  
  public localData: any;
  public action: string;
  public form: FormGroup;
  public unidadMedida:any;
  public categoria:any;
  public localDataCategoria:any;
  public localDataUnidadMedida:any;
  public id:number;
  disableSelect:boolean=true;
  precioVenta:String;
  esInsumoOpciones:String;

  constructor(public dialogRef: MatDialogRef<ModalInsumoComponent>,
    public formBuilder: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Insumo, private datePipe: DatePipe, private service:CategoriaInsumoService, private service2:UnidadMedidaService) {
    this.localData = { ...data };
    console.log("data.categoria.id "+ data.categoria)
    if(data.categoria === undefined ){
      this.id=0;
    }else{
      this.id=data.categoria.id;
    }
  }

  ngOnInit(): void {
    this.getAllCategoria();
    this.buildForm();
    this.setAction();
    this.precioVenta=this.localData.precioVenta;
    if(this.localData.esInsumo!=undefined){
      this.form.controls['esInsumoOpciones'].setValue(this.localData.esInsumo.toString());
    }
    
  }

  getAllCategoria():void{
    this.service.getAll().subscribe(data => {
      this.localDataCategoria = data;
      this.getAllUnidadMedida();
    })
  }

  getAllUnidadMedida():void{
    this.service2.getAll().subscribe(data2 => {
      this.localDataUnidadMedida = data2;
    })
  }

  buildForm() {
    this.form = this.formBuilder.group({
      id: [this.localData.id],
      nombre: [this.localData.nombre, [Validators.required]],
      descripcion: [this.localData.descripcion, [Validators.required]],
      precioCompra: [this.localData.precioCompra, [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
      precioVenta: [{value:this.localData.precioVenta, disabled: this.localData.esInsumo}, [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],  
      stockActual: [this.localData.stockActual, [Validators.required,Validators.pattern(/^[0-9]\d*$/)]],
      stockMaximo: [this.localData.stockMaximo, [Validators.required,Validators.pattern(/^[0-9]\d*$/)]],
      stockMinimo: [this.localData.stockMinimo, [Validators.required,Validators.pattern(/^[0-9]\d*$/)]],
      esInsumo: [this.localData.esInsumo],
      imagen: [this.localData.imagen],
      categoria: [this.localData.categoria],
      unidadMedida: [this.localData.unidadMedida],
      eliminado: [this.localData.eliminado],
      esInsumoOpciones: [this.esInsumoOpciones],
      categoriaOpciones:[this.categoria],
      unidadMedidaOpciones:[this.unidadMedida]
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

  dS(o:boolean){
    this.disableSelect=o;
    if(o){
      this.form.controls['esInsumo'].setValue(true);
      this.form.controls['esInsumoOpciones'].setValue("true");
      this.form.controls['precioVenta'].setValue(0);
      this.form.controls['precioVenta'].disable();
    }else{
      this.form.controls['esInsumoOpciones'].setValue("false");
      this.form.controls['esInsumo'].setValue(false);
      this.form.controls['precioVenta'].setValue(this.precioVenta);
      this.form.controls['precioVenta'].enable();
      
    }
  }
  cargarCategoria(categoria:CategoriaInsumo):void{
    this.form.controls['categoria'].setValue(categoria);
    this.id=categoria.id;
  }

  cargarUnidadMedida(um:UnidadMedida):void{
    this.form.controls['unidadMedida'].setValue(um);
  }

}
