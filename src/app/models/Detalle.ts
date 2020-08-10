import { Pedido } from './Pedido';
import { Insumo } from './Insumo';
import { Plato } from './Plato';

export interface Detalle {
    id?: number;
    cantidad?: number;
    monto?: number;
    plato?: Plato;
    insumo?: Insumo;
    pedido?: Pedido;
    eliminado?: boolean;
}