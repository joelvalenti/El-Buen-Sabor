import { BaseService } from '../base.service';
import { Detalle } from "../../models/Detalle";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DetalleService extends BaseService<Detalle> {

  protected miUrl = 'http://localhost:9000/api/v1/detalle/';
  protected miUrl2 = 'http://localhost:9000/api/v1/detalle/query/';
  protected miUrl3 = 'http://localhost:9000/api/v1/detalle/buscarPorPlato/';
  protected miUrl4 = 'http://localhost:9000/api/v1/detalle/buscarPorInsumo/';

  constructor(protected http: HttpClient) {
    super(http);
  }

  buscarPorPedido(id:number): Observable<Detalle[]> {
    return this.http.get<Detalle[]>(this.miUrl2 + id);
  }
  buscarPorPlato(id:number, id2:number): Observable<Detalle[]> {
    return this.http.get<Detalle[]>(this.miUrl3 + id + '/' + id2);
  }
  buscarPorInsumo(id:number, id2:number): Observable<Detalle[]> {
    return this.http.get<Detalle[]>(this.miUrl3 + id + '/' + id2);
  }

}