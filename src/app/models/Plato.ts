import { DetallePlato } from 'src/app/models/DetallePlato';
export interface Plato {
    id: number,
    nombre: String,
    precioVenta:number,
    precioCosto:number,
    tiempoPreparacion:number,
    descripcion:String,
    imagen:String,
    cantidadVendida:number,
    detalle:DetallePlato,
    categoria:any,
    eliminado:boolean
}