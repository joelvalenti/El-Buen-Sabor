import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Plato } from '../modelo/plato';

@Injectable({
  providedIn: 'root'
})
export class PlatoService {

  constructor(private http:HttpClient) { }

  _miUrl : string = 'http://localhost:9000/api/v1/plato/';

  getAll():Observable<Plato[]>{
    return this.http.get<Plato[]>(this._miUrl);
  }

  getByCategory(categoria:string):Observable<Plato[]>{
    return this.http.get<Plato[]>(this._miUrl+'searchByCategory/' + categoria);
  }

  getOne(id:number):Observable<Plato>{
    return this.http.get<Plato>(this._miUrl + id);
  }

  post(platoNuevo : Plato):Observable<Plato>{
    return this.http.post(this._miUrl, platoNuevo);
  }

  put(id:number, platoNuevo : Plato):Observable<Plato>{
    return this.http.put(this._miUrl + id, platoNuevo);
  }

  delete(id:number):Observable<any>{
    return this.http.delete(this._miUrl+id);
  }
}
