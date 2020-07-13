import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfiguracionService {
  url = 'http://localhost:9000/api/v1/configuracionEmpresa/';
  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  getOne(id: number): Observable<any> {
    return this.http.get<any>(this.url + id);
  }

  post(configuracion: any): Observable<any> {
    return this.http.post<any>(this.url, configuracion);
  }

  put(configuracion: any): Observable<any> {
    return this.http.put<any>(this.url + configuracion.id, configuracion);
  }
  delete(id: number): Observable<any> {
    return this.http.delete(this.url + id);
  }
}
