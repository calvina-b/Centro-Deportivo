// USUARIO
export interface IUser {
    id_usuario?: number;
    nombre?: string;
    nombre_usuario?: string;
    rut?: number;
    dV?: string;
    correo?: string;
    telefono?: number;
    direccion?: string;
    tipo_cuenta?: string;
    password?: string;
}

// CANCHA
export interface IFields {
    id?: number;
    deporte?: string;
    precio_Base?: number;
}

// ARBITRO
export interface IReferees {
    id_arbitro?: number;
    nombre?: string;
    nro_contacto?: number;
    correo?: string;
    rut?: number;
    deporte?: string;
}

//ARTICULO
export interface IItems {
    cod?: number;
    id_cancha?: number;
    deporte_cancha?: string;
    nombre_art?: string;
    valor?: number;
    precio_costo?: number;
    estado?: string;
}

// HORARIO
export interface IScheds {
    id_horario?: number;
    hora_inicio?: string;
    hora_termino?: string;
}