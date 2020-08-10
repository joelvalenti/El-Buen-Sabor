import { LocalidadService } from './../../../services/allServices/localidad.service';
import { DomicilioService } from 'src/app/services/allServices/domicilio.service';
import { UsuarioComponent } from './../../usuario/usuario.component';
import { Usuario } from './../../../models/Usuario';
import { Localidad } from './../../../models/Localidad';
import { Component, OnInit, ViewChild, ElementRef, Input, Host } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Domicilio } from 'src/app/models/Domicilio';

@Component({
  selector: 'app-modal-domicilio',
  templateUrl: './modal-domicilio.component.html',
  styleUrls: ['./modal-domicilio.component.css']
})
export class ModalDomicilioComponent implements OnInit {

  @ViewChild('btnClose', { static: true }) btnClose: ElementRef;

  public formDomicilio: FormGroup;
  public domicilio: Domicilio;
  public idPropietario: number;
  public domicilios;
  public localidades;
  usuario: Usuario;
  localidad: Localidad;
  public edit: boolean = false;
  public idPersona: number;
  public indiceP: number;

  @Input() set id(valor: number) {
    if (valor) {
      this.idPropietario = valor;
    }
  }

  @Input() set indicePosicion(valor) {
    if (valor) {
      this.indiceP = valor;
    }
  }

  @Input() set domicilioSeleccionado(valor) {
    this.onBuild();
    if (valor) {
      this.domicilio = valor;
      this.formDomicilio.patchValue({
        id: valor.id,
        calle: valor.calle,
        numero: valor.numero,
        localidad: valor.localidad,
        departamento: valor.departamento,
        piso: valor.piso,
        propietario: valor.propietario
      });
      if (valor.id !== 0 || valor.id === null) {
        this.edit = true;
      } else {
        this.edit = false;
      }
    }
  }

  constructor(@Host() private tabla: UsuarioComponent,
  private servicio: DomicilioService, private localidadService: LocalidadService,
    private formBuilder: FormBuilder) { }

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
    this.servicio.buscarporUsuario(3).subscribe( response => {
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
    this.btnClose.nativeElement.click();
    //Llamar a Host para el método getDomicilios...
    if (formDomicilio.value.id === null) {
      // Add
      this.addDomicilio(formDomicilio.value);
    } else {
      // Update
      this.updateDomicilio(formDomicilio.value);
    }
  }

  addDomicilio(domicilio: Domicilio) {
    this.servicio.post(domicilio).subscribe(
      res => {
        this.domicilios.push(res);
      },
      err => {
        alert('Ocurrió un error al agregar el domicilio'+ err);
      }
    );
  }

  updateDomicilio(domicilio: Domicilio) {
    this.servicio.put(domicilio.id, domicilio).subscribe(
      res => {
        alert('El domicilio fue actualizado con éxito');
        this.tabla.domicilios.splice(this.indiceP, 1, domicilio);
        this.indiceP = null;
        alert('El usuario fue actualizado con éxito');
        this.getAllDomiciliosXUsuario();
      },
      err => {
        alert('Ocurrió un error al actualizar usuario '+ err);
      }  
    );
  }

  onReset(){
    this.domicilioSeleccionado = null;
  }

}
