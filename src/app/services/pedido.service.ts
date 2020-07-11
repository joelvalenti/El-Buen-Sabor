import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  _URL = 'http://localhost:9000/api/v1/pedido/';
  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this._URL);
  }

  getOne(id: number): Observable<any> {
    return this.http.get<any>(this._URL + id);
  }
}
