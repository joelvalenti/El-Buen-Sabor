import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  url = 'http://localhost:9000/api/v1/pedido/';
  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  getOne(id: number): Observable<any> {
    return this.http.get<any>(this.url + id);
  }

  post(pedido: any): Observable<any> {
    return this.http.post<any>(this.url, pedido);
  }

  put(pedido: any): Observable<any> {
    return this.http.put<any>(this.url + pedido.id, pedido);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.url + id);
  }

  updateEstado(status: number, pedido: any): Observable<any> {
    return this.http.put<any>(
      this.url + 'changeStatus/' + pedido.id + '/' + status,
      pedido
    );
  }
}
