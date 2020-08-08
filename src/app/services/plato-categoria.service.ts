import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlatoCategoriaService {
  url = 'http://localhost:9000/api/v1/plato/categoria/';
  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  getOne(id: number): Observable<any> {
    return this.http.get<any>(this.url + id);
  }

  post(platoCategoria: any): Observable<any> {
    return this.http.post<any>(this.url, platoCategoria);
  }

  put(platoCategoria: any): Observable<any> {
    return this.http.put<any>(this.url + platoCategoria.id, platoCategoria);
  }
  delete(id: number): Observable<any> {
    return this.http.delete(this.url + id);
  }
}
