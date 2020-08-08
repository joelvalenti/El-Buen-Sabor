import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DetalleService {

  url = 'http://localhost:9000/api/v1/detalle/';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  getOne(id: number): Observable<any> {
    return this.http.get<any>(this.url + id);
  }

  post(detalle: any): Observable<any> {
    return this.http.post<any>(this.url, detalle);
  }

  put(detalle: any): Observable<any> {
    return this.http.put<any>(this.url + detalle.id, detalle);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.url + id);
  }

  buscarPorPedido(id:number): Observable<any>{
    return this.http.get<any[]>(this.url+"query/"+id);
  }


}
