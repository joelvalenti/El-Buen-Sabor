import { CategoriaInsumo } from './CategoriaInsumo';
import { UnidadMedida } from './UnidadMedida';

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
    categoria: CategoriaInsumo;
    unidadMedida: UnidadMedida;
    eliminado: boolean;
}