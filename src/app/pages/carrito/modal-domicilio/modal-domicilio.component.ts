import { Usuario } from './../../../models/Usuario';
import { Localidad } from './../../../models/Localidad';
import { LocalidadService } from './../../../services/localidad.service';
import { DomicilioService } from './../../../services/domicilio.service';
import { Component, OnInit, ViewChild, ElementRef, Input, ɵConsole } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Domicilio } from 'src/app/models/Domicilio';

@Component({
  selector: 'app-modal-domicilio',
  templateUrl: './modal-domicilio.component.html',
  styleUrls: ['./modal-domicilio.component.css']
})
export class ModalDomicilioComponent implements OnInit {

  @ViewChild('btnClose', { static: true }) btnClose: ElementRef;

  @Input() set id(valor: number) {
    if (valor) {
      this.idPropietario = valor;
    }
  }

  public formDomicilio: FormGroup;
  public domicilio: Domicilio;
  public idPropietario: number;
  public domicilios;
  public localidades;
  usuario: Usuario;
  localidad: Localidad;

  constructor(private servicio: DomicilioService, private localidadService: LocalidadService,
    private formBuilder: FormBuilder, private actRoute: ActivatedRoute) { }

  ngOnInit() {
    this.onBuild();
    this.getAllDomiciliosXUsuario();
    this.getLocalidades();
  }

  onBuild() {
    this.formDomicilio = this.formBuilder.group({
      id: null,
      calle: new FormControl('', [Validators.required]),
      numero: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]),
      departamento: new FormControl('', [Validators.required]),
      piso: new FormControl('', [Validators.required]),
      propietario: this.formBuilder.group({
        id: '' //Esto se harcodea según el id del usuario logeado...
      }),
      localidad: this.formBuilder.group({
        id: ''
      })
    });
  }

  getAllDomiciliosXUsuario(){
    //obtener el id del usuario logeado...
    this.servicio.buscarPorUsuario(3).subscribe( response => {
      this.domicilios = response;
    },
    err =>{
      console.log("Error en get all domicilios - Modal dom");
    })
  }

  getLocalidades(){
    this.localidadService.getAll().subscribe( response => {
      this.localidades = response;
    },
    err =>{
      console.log("Error en get all localidades - Modal dom");
    })
  }

  onSave(formDomicilio: FormGroup): void {
    formDomicilio.value.propietario.id = 3; //Acá se hardcodea el usuario.
    formDomicilio.value.eliminado = false; //Todo domicilio nuevo tiene false por defecto.
    this.add(formDomicilio.value);
    this.btnClose.nativeElement.click();
    //Llamar a Host para el método getDomicilios...
  }

  add(domicilio: Domicilio) {
    this.servicio.post(domicilio).subscribe(
      res => {
        this.domicilios.push(res);
      },
      err => {
        alert('Ocurrió un error al agregar el domicilio'+ err);
      }
    );
  }

}
