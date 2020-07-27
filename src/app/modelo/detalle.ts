import { Plato } from './plato';
import { Insumo } from './Insumo';
import { Pedido } from './pedido';

export interface Detalle{
    id ?: number;
    cantidad ?: number;
    pedido ?: Pedido;
    plato ?: Plato;
    insumo ?: Insumo;
}