import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalidadService {
  url = 'http://localhost:9000/api/v1/localidad/';
  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  getOne(id: number): Observable<any> {
    return this.http.get<any>(this.url + id);
  }

  post(instrumento: any): Observable<any> {
    return this.http.post<any>(this.url, instrumento);
  }

  put(instrumento: any): Observable<any> {
    return this.http.put<any>(this.url + instrumento.id, instrumento);
  }
  delete(id: number): Observable<any> {
    return this.http.delete(this.url + id);
  }
}
