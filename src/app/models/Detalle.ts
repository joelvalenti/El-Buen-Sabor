import { Insumo } from './Insumo';
import { Plato } from './Plato';

export interface Detalle {
    id: number;
    cantidad: number;
    plato: Plato;
    insumo: Insumo;
    eliminado: boolean;
}