import { BaseService } from '../base.service';
import { Categoria } from "../../models/Categoria";
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class CategoriaInsumoService extends BaseService<Categoria> {

  protected miUrl = 'http://localhost:9000/api/v1/insumo/categoria/';

}