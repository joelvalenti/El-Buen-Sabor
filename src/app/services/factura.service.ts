import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FacturaService {
  url = 'http://localhost:9000/api/v1/factura/';
  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  getOne(id: number): Observable<any> {
    return this.http.get<any>(this.url + id);
  }

  post(factura: any): Observable<any> {
    return this.http.post<any>(this.url, factura);
  }

  put(factura: any): Observable<any> {
    return this.http.put<any>(this.url + factura.id, factura);
  }
  delete(id: number): Observable<any> {
    return this.http.delete(this.url + id);
  }
}
