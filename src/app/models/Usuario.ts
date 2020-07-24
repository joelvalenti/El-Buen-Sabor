export interface Usuario {
    id: number,
    nombre: String,
    apellido: String,
    dni: number,
    email: String,
    password: String,
    imagen: String,
    telefono: number,
    esCliente: boolean,
    fechaNacimiento: Date,
    Rol: String,
    eliminado: boolean
}