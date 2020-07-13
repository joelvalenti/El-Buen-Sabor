import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UnidadMedidaService {
  url = 'http://localhost:9000/api/v1/unidad/medida/';
  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  getOne(id: number): Observable<any> {
    return this.http.get<any>(this.url + id);
  }

  post(unidadMedida: any): Observable<any> {
    return this.http.post<any>(this.url, unidadMedida);
  }

  put(unidadMedida: any): Observable<any> {
    return this.http.put<any>(this.url + unidadMedida.id, unidadMedida);
  }
  delete(id: number): Observable<any> {
    return this.http.delete(this.url + id);
  }
}
