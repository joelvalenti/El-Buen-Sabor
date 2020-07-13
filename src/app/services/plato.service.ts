import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlatoService {
  url = 'http://localhost:9000/api/v1/plato/';
  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  getOne(id: number): Observable<any> {
    return this.http.get<any>(this.url + id);
  }

  post(plato: any): Observable<any> {
    return this.http.post<any>(this.url, plato);
  }

  put(plato: any): Observable<any> {
    return this.http.put<any>(this.url + plato.id, plato);
  }
  delete(id: number): Observable<any> {
    return this.http.delete(this.url + id);
  }
}
