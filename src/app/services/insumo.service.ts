import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Insumo } from '../modelo/Insumo';

@Injectable({
  providedIn: 'root',
})
export class InsumoService {
  
  url = 'http://localhost:9000/api/v1/insumo/';
  constructor(private http: HttpClient) {}

  getEsInsumo(esInsumo: boolean): Observable<Insumo[]>{
    return this.http.get<Insumo[]>(this.url + '/esInsumo/' + esInsumo);
  }

  getAll(): Observable<Insumo[]> {
    return this.http.get<Insumo[]>(this.url);
  }

  getOne(id: number): Observable<Insumo> {
    return this.http.get<Insumo>(this.url + id);
  }

  post(insumo: Insumo): Observable<Insumo> {
    return this.http.post<Insumo>(this.url, insumo);
  }

  put(insumo: Insumo): Observable<Insumo> {
    return this.http.put<Insumo>(this.url + insumo.id, insumo);
  }
  delete(id: number): Observable<any> {
    return this.http.delete(this.url + id);
  }
}
