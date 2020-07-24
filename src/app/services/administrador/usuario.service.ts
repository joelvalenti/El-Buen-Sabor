import { BaseService } from '../base.service';
import { Usuario } from "../../models/Usuario";
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends BaseService<Usuario> {

  protected miUrl = 'http://localhost:9000/api/v1/usuario/';

}