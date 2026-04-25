import axios from 'axios';
import { Alumno, Materia, Nota } from '../types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_URL,
});

// --- SERVICIO DE ALUMNOS ---
export const alumnoService = {
    getAll: () => api.get<Alumno[]>('/alumnos'),
    getById: (id: number) => api.get<Alumno>(`/alumnos/${id}`),
    create: (data: Alumno) => api.post<Alumno>('/alumnos', data),
    update: (id: number, data: Alumno) => api.put<Alumno>(`/alumnos/${id}`, data),
    delete: (id: number) => api.delete(`/alumnos/${id}`),
};

// --- SERVICIO DE MATERIAS ---
export const materiaService = {
    getAll: () => api.get<Materia[]>('/materias'),
    getById: (id: number) => api.get<Materia>(`/materias/${id}`),
    create: (data: Materia) => api.post<Materia>('/materias', data),
    update: (id: number, data: Materia) => api.put<Materia>(`/materias/${id}`, data),
    delete: (id: number) => api.delete(`/materias/${id}`),
};

// --- SERVICIO DE NOTAS ---
export const notaService = {
    // Registrar una nota
    create: (data: { alumnoId: number, materiaId: number, valor: number }) =>
        api.post<Nota>('/notas', data),

    // Listar notas (usualmente el backend filtra por alumno si pasas el ID como query param o path variable)
    getByAlumno: (alumnoId: number) =>
        api.get<Nota[]>(`/notas/alumno/${alumnoId}`),
};

export default api;