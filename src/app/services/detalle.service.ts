import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Detalle } from '../modelo/detalle';

@Injectable({
  providedIn: 'root',
})
export class DetalleService {
  url = 'http://localhost:9000/api/v1/detalle/';
  constructor(private http: HttpClient) {}

  getAll(): Observable<Detalle[]> {
    return this.http.get<Detalle[]>(this.url);
  }

  getOne(id: number): Observable<Detalle> {
    return this.http.get<Detalle>(this.url + id);
  }

  post(detalle: Detalle): Observable<Detalle> {
    return this.http.post<Detalle>(this.url, detalle);
  }

  put(detalle: Detalle): Observable<Detalle> {
    return this.http.put<Detalle>(this.url + detalle.id, detalle);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.url + id);
  }

  buscarPorPedido(id: Detalle): Observable<Detalle[]> {
    return this.http.get<Detalle[]>(this.url + 'query/' + id);
  }
}
