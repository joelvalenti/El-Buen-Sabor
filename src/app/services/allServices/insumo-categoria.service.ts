import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root',
})
export class InsumoCategoriaService extends BaseService<InsumoCategoriaService>{

  protected miUrl = 'http://localhost:9000/api/v1/insumo/categoria/';

}
