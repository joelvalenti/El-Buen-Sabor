import { Factura } from './../../models/Factura';
import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root',
})
export class FacturaService extends BaseService<Factura> {

  protected miUrl = 'http://localhost:9000/api/v1/factura/';

}
