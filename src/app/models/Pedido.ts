import { Estado } from './Estado';
import { Domicilio } from './Domicilio';
import { Detalle } from './Detalle';
import { Usuario } from './Usuario';

export interface Pedido {
    id?: number;
    horaEstimada?: string;
    envioDelivery?: boolean;
    monto?: Float64Array;
    fecha?: Date;
    estado?: Estado;
    usuario?: Usuario;
    domicilio?: Domicilio;
    tiempoPreparacion?: number;
    eliminado?: boolean;
}