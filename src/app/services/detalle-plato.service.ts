import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DetallePlatoService {
  url = 'http://localhost:9000/api/v1/detalle/plato/';
  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  getOne(id: number): Observable<any> {
    return this.http.get<any>(this.url + id);
  }

  post(detallePlato: any): Observable<any> {
    return this.http.post<any>(this.url, detallePlato);
  }

  put(detallePlato: any): Observable<any> {
    return this.http.put<any>(this.url + detallePlato.id, detallePlato);
  }
  delete(id: number): Observable<any> {
    return this.http.delete(this.url + id);
  }
}
