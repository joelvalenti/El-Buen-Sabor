import { PlatoCategoria } from "./PlatoCategoria";
import { DetallePlato } from "./DetallePlato";

export interface Plato {
    id: number;
    cantidadVendida: number;
    tiempoPreparacion: number;
    precioVenta: number;
    precioCosto: number;
    descripcion: string;
    imagen: string;
    nombre: string;
    detalle: DetallePlato[];
    categoria: PlatoCategoria;
    eliminado: boolean;
}