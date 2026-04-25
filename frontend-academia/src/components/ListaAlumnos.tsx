import React, { useState, useEffect } from 'react';
import { alumnoService } from '../services/api';
import axios from 'axios';
import { Alumno } from '../types';
import { User, Mail, Calendar, Trash2, Edit, X, Check } from 'lucide-react';

const ListaAlumnos = () => {
    const [alumnos, setAlumnos] = useState<Alumno[]>([]);
    const [loading, setLoading] = useState(true);

    const [editandoId, setEditandoId] = useState<number | null>(null);
    const [editFormData, setEditFormData] = useState<Partial<Alumno>>({});

    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

    const cargarAlumnos = async () => {
        try {
            const response = await axios.get(`${API_URL}/alumnos`);
            setAlumnos(response.data);
        } catch (error) {
            console.error("Error al cargar alumnos", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarAlumnos();
    }, []);

    const handleEliminar = async (id: number) => {
        if (window.confirm("¿Estás seguro de eliminar este alumno? Se borrarán sus notas asociadas.")) {
            try {
                await alumnoService.delete(id);
                cargarAlumnos();
            } catch (error) {
                alert("Error al eliminar");
            }
        }
    };

    const iniciarEdicion = (alumno: Alumno) => {
        setEditandoId(alumno.id || null);
        setEditFormData(alumno);
    };

    const cancelarEdicion = () => {
        setEditandoId(null);
        setEditFormData({});
    };

    const guardarEdicion = async (id: number) => {
        if (!editFormData.nombre || !editFormData.email?.includes('@')) {
            alert("Por favor, verifica que el nombre y el email sean válidos.");
            return;
        }

        try {
            await alumnoService.update(id, editFormData as Alumno);
            setEditandoId(null);
            cargarAlumnos();
        } catch (error: any) {
            const msg = error.response?.data?.email || "Error al actualizar los datos";
            alert(msg);
        }
    };

    if (loading) return <div className="text-center p-10 text-slate-500">Cargando alumnos...</div>;

        return (
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-slate-200">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="p-4 font-semibold text-slate-700">Alumno</th>
                            <th className="p-4 font-semibold text-slate-700">Contacto</th>
                            <th className="p-4 font-semibold text-slate-700">Notas</th>
                            <th className="p-4 font-semibold text-slate-700 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alumnos.map((alumno) => (
                            <tr key={alumno.id} className="border-b hover:bg-slate-50 transition">
                                <td className="p-4">
                                    {editandoId === alumno.id ? (
                                        <div className="flex flex-col gap-2">
                                            <input
                                                className="border p-1 rounded text-sm"
                                                value={editFormData.nombre}
                                                onChange={e => setEditFormData({...editFormData, nombre: e.target.value})}
                                            />
                                            <input
                                                className="border p-1 rounded text-sm"
                                                value={editFormData.apellido}
                                                onChange={e => setEditFormData({...editFormData, apellido: e.target.value})}
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-3">
                                            <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                                                <User size={20} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-800">{alumno.nombre} {alumno.apellido}</p>
                                                <p className="text-xs text-slate-500 flex items-center gap-1">
                                                    <Calendar size={12} /> {alumno.fechaNacimiento}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </td>
                                <td className="p-4 text-sm text-slate-600">
                                    {editandoId === alumno.id ? (
                                        <input
                                            className="border p-1 rounded text-sm w-full"
                                            value={editFormData.email}
                                            onChange={e => setEditFormData({...editFormData, email: e.target.value})}
                                        />
                                    ) : (
                                        <div className="flex items-center gap-1">
                                            <Mail size={14} className="text-slate-400" /> {alumno.email}
                                        </div>
                                    )}
                                </td>
                                <td className="p-4">
                                    <div className="flex flex-wrap gap-1">
                                        {alumno.notas && alumno.notas.length > 0 ? (
                                            alumno.notas.map((n, idx) => (
                                                <span key={idx} className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold">
                                                    {n.valor.toFixed(1)}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-slate-400 text-xs italic">Sin notas</span>
                                        )}
                                    </div>
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        {editandoId === alumno.id ? (
                                            <>
                                                <button onClick={() => guardarEdicion(alumno.id!)} className="text-green-600 hover:bg-green-50 p-1 rounded">
                                                    <Check size={20} />
                                                </button>
                                                <button onClick={cancelarEdicion} className="text-slate-400 hover:bg-slate-50 p-1 rounded">
                                                    <X size={20} />
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button onClick={() => iniciarEdicion(alumno)} className="text-blue-500 hover:bg-blue-50 p-1 rounded transition">
                                                    <Edit size={18} />
                                                </button>
                                                <button onClick={() => alumno.id && handleEliminar(alumno.id)} className="text-red-400 hover:bg-red-50 p-1 rounded transition">
                                                    <Trash2 size={18} />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };
export default ListaAlumnos;