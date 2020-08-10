import { BaseService } from '../base.service';
import { Insumo } from "../../models/Insumo";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class InsumoService extends BaseService<Insumo> {

  protected miUrl = 'http://localhost:9000/api/v1/insumo/';
  protected miUrl3 = 'http://localhost:9000/api/v1/insumo/esInsumo/'+true;
  protected miUrl2 = 'http://localhost:9000/api/v1/insumo/insumoporcategoria/';
  protected miUrl4 = 'http://localhost:9000/api/v1/insumo/stocks/';

  constructor(protected http: HttpClient) {
    super(http);
  }

  buscarporCategoria(id:number): Observable<Insumo[]> {
    return this.http.get<Insumo[]>(this.miUrl2 + id);
  }
  buscarInsumoporCategoria(): Observable<Insumo[]> {
    return this.http.get<Insumo[]>(this.miUrl3);
  }

  getStocks(id:number): Observable<Insumo[]> {
    return this.http.get<Insumo[]>(this.miUrl4+id);
  }

}