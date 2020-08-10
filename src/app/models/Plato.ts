import { Categoria } from './Categoria';
import { DetallePlato } from "./DetallePlato";

export interface Plato {
    id: number,
    nombre: String,
    precioVenta: number,
    precioCosto: number,
    tiempoPreparacion: number,
    descripcion: String,
    imagen: String,
    cantidadVendida: number,
    detalle: DetallePlato,
    categoria: Categoria,
    eliminado: boolean
}