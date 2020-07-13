import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InsumoService {
  url = 'http://localhost:9000/api/v1/insumo/';
  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  getOne(id: number): Observable<any> {
    return this.http.get<any>(this.url + id);
  }

  post(insumo: any): Observable<any> {
    return this.http.post<any>(this.url, insumo);
  }

  put(insumo: any): Observable<any> {
    return this.http.put<any>(this.url + insumo.id, insumo);
  }
  delete(id: number): Observable<any> {
    return this.http.delete(this.url + id);
  }
}
