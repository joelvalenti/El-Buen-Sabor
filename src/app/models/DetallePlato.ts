import { Plato } from './Plato';
import { Insumo } from './Insumo';

export interface DetallePlato {
  id: number;
  cantidad: number;
  ingrediente: Insumo;
  plato: Plato;
  eliminado: boolean;
}
