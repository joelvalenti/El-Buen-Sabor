import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DomicilioService {
  url = 'http://localhost:9000/api/v1/domicilio/';
  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  getOne(id: number): Observable<any> {
    return this.http.get<any>(this.url + id);
  }

  buscarPorUsuario(id: number): Observable<any>{
    return this.http.get<any[]>(this.url+"buscarporUsuario/"+id);
  }

  post(domicilio: any): Observable<any> {
    return this.http.post<any>(this.url, domicilio);
  }

  put(domicilio: any): Observable<any> {
    return this.http.put<any>(this.url + domicilio.id, domicilio);
  }
  delete(id: number): Observable<any> {
    return this.http.delete(this.url + id);
  }
}
