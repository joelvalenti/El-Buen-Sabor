import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserInterface } from '../modelo/user';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http:HttpClient) { }

  _miUrl : string = 'http://localhost:9000/api/v1/usuario/';

  getAll():Observable<UserInterface[]>{
    return this.http.get<UserInterface[]>(this._miUrl);
  }

  getOne(id:number):Observable<UserInterface>{
    return this.http.get<UserInterface>(this._miUrl + id);
  }

  getEmail(email:string):Observable<UserInterface>{
    return this.http.get<UserInterface>(this._miUrl+'searchbyemail/' + email);
  }

  post(usuarioNuevo : UserInterface):Observable<UserInterface>{
    return this.http.post(this._miUrl, usuarioNuevo);
  }

  put(id:number, usuarioNuevo:UserInterface):Observable<UserInterface>{
    return this.http.put(this._miUrl + id, usuarioNuevo);
  }

  delete(id:number):Observable<any>{
    return this.http.delete(this._miUrl+id);
  }
}
