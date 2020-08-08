import { UnidadMedida } from './UnidadMedida';
import { InsumoCategoria } from './InsumoCategoria';

export interface Insumo {
    id: number;
    precioCompra: number;
    precioVenta: number;
    stockActual: number;
    stockMinimo: number;
    stockMaximo: number;
    esInsumo: boolean;
    nombre: string;
    descripcion: string;
    categoria: InsumoCategoria;
    unidadMedida: UnidadMedida;
    eliminado: boolean;
}