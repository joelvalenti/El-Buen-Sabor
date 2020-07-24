import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../modelo/categoria';

@Injectable({
  providedIn: 'root'
})
export class PlatocategoriaService {

  constructor(private http:HttpClient) { }

  _miUrl : string = 'http://localhost:9000/api/v1/plato/categoria/';

  getAll():Observable<Categoria[]>{
    return this.http.get<Categoria[]>(this._miUrl);
  }

  getOne(id:number):Observable<Categoria>{
    return this.http.get<Categoria>(this._miUrl + id);
  }

  post(categoriaNueva : Categoria):Observable<Categoria>{
    return this.http.post(this._miUrl, categoriaNueva);
  }

  put(id:number, categoriaNueva : Categoria):Observable<Categoria>{
    return this.http.put(this._miUrl + id, categoriaNueva);
  }

  delete(id:number):Observable<any>{
    return this.http.delete(this._miUrl+id);
  }
}
