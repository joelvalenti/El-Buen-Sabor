import { Usuario } from './Usuario';
import { Localidad } from './Localidad';

export interface Domicilio {
    id?: number;
    calle?: string;
    numero?: number;
    departamento?: string;
    piso?: string;
    localidad: {
        id: number;
    }
    propietario: {
        id: number;
    };
    eliminado?: boolean;
}