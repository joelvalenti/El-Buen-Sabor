import { BaseService } from '../base.service';
import { Pedido } from "../../models/Pedido";
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class PedidoService extends BaseService<Pedido> {

  protected miUrl = 'http://localhost:9000/api/v1/pedido/';

  
}