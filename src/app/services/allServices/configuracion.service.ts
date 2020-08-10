import { ConfiguracionEmpresa } from './../../models/ConfiguracionEmpresa';
import { BaseService } from '../base.service';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService extends BaseService<ConfiguracionEmpresa> {

  protected miUrl = 'http://localhost:9000/api/v1/configuracionEmpresa/';

}
