export interface Alumno {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    fechaNacimiento: string;
    notas?: Nota[];
}

export interface Materia {
    id: number;
    nombre: string;
    codigo: string;
    creditos: number;
}

export interface Nota {
    id?: number;
    valor: number;
    fechaRegistro?: string;
    alumnoId?: number;
    materiaId?: number;
}