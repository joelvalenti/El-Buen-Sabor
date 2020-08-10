export interface Usuario {
    id?: number;
    dni?: number;
    telefono?: number;
    esCliente?: boolean;
    fechaNacimiento?: Date;
    nombre?: string;
    apellido?: string;
    email?: string;
    password?: string;
    imagen?: string;
    Rol?: string;
    eliminado?: boolean;
}