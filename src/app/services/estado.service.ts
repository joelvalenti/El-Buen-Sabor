import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EstadoService {
  url = 'http://localhost:9000/api/v1/estado/';
  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  getOne(id: number): Observable<any> {
    return this.http.get<any>(this.url + id);
  }

  post(estado: any): Observable<any> {
    return this.http.post<any>(this.url, estado);
  }

  put(estado: any): Observable<any> {
    return this.http.put<any>(this.url + estado.id, estado);
  }
  delete(id: number): Observable<any> {
    return this.http.delete(this.url + id);
  }
}
