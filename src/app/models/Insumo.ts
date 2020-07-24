export interface Insumo{
    id:number,
    nombre:String,
    descripcion:String,
    precioCompra:number,
    precioVenta:number,
    stockActual:number,
    stockMaximo:number,
    stockMinimo:number,
    esInsumo:boolean,
    imagen:String,
    categoria:any,
    unidadMedida:any,
    eliminado:boolean
}