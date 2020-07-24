import { BaseService } from '../base.service';
import { Plato } from "../../models/Plato";
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
  })
export class PlatoService extends BaseService<Plato> {

  protected miUrl = 'http://localhost:9000/api/v1/plato/';

}
