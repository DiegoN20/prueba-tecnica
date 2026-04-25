import React, { useState, useEffect } from 'react';
import { materiaService } from '../services/api';
import { Materia } from '../types';
import { BookOpen, Hash, Award, Trash2, Edit, X, Check } from 'lucide-react';

const ListaMaterias = () => {
    const [materias, setMaterias] = useState<Materia[]>([]);
    const [loading, setLoading] = useState(true);
    const [editandoId, setEditandoId] = useState<number | null>(null);
    const [editFormData, setEditFormData] = useState<Partial<Materia>>({});

    const cargarMaterias = async () => {
        try {
            setLoading(true);
            console.log("Intentando obtener materias desde el servicio...");
            const response = await materiaService.getAll();
            console.log("Materias obtenidas con éxito:", response.data);
            setMaterias(response.data);
        } catch (error) {
            console.error("Error detallado al cargar materias:", error);
        } finally {
            setLoading(false);
        }
    };

    const iniciarEdicion = (materia: Materia) => {
        setEditandoId(materia.id || null);
        setEditFormData(materia);
    };

    const handleEliminar = async (id: number) => {
        if (window.confirm("¿Eliminar esta materia?")) {
            try {
                await materiaService.delete(id);
                cargarMaterias();
            } catch (error) {
                alert("Error al eliminar");
            }
        }
    };

    const guardarEdicion = async (id: number) => {
        if (!editFormData.nombre || !editFormData.codigo || !editFormData.creditos) {
            alert("Todos los campos son obligatorios para actualizar.");
            return;
        }
        try {
            await materiaService.update(id, editFormData as Materia);
            setEditandoId(null);
            cargarMaterias();
        } catch (error: any) {
            alert("Error al actualizar");
        }
    };

    useEffect(() => {
        cargarMaterias();
    }, []);

    if (loading) return <div className="text-center p-10 text-slate-500 italic">Cargando listado de materias...</div>;

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-slate-200">
             <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                        <th className="p-4 font-semibold text-slate-700">Materia</th>
                        <th className="p-4 font-semibold text-slate-700 text-center">Créditos</th>
                        <th className="p-4 font-semibold text-slate-700 text-right">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {materias.length === 0 ? (
                        <tr>
                            <td colSpan={3} className="p-10 text-center text-slate-400">
                                No hay materias registradas actualmente.
                            </td>
                        </tr>
                    ) : (
                        materias.map((materia) => (
                            <tr key={materia.id} className="border-b hover:bg-slate-50 transition">
                                <td className="p-4">
                                    {editandoId === materia.id ? (
                                        <div className="flex flex-col gap-2">
                                            <input
                                                className="border p-1 rounded text-sm font-bold"
                                                value={editFormData.nombre}
                                                onChange={e => setEditFormData({...editFormData, nombre: e.target.value})}
                                            />
                                            <input
                                                className="border p-1 rounded text-sm text-blue-600 uppercase"
                                                value={editFormData.codigo}
                                                onChange={e => setEditFormData({...editFormData, codigo: e.target.value})}
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-3">
                                            <div className="bg-indigo-100 p-2 rounded-full text-indigo-600">
                                                <BookOpen size={20} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-800">{materia.nombre}</p>
                                                <p className="text-xs text-slate-500 flex items-center gap-1">
                                                    <Hash size={12} /> {materia.codigo}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </td>
                                <td className="p-4 text-center">
                                    {editandoId === materia.id ? (
                                        <input
                                            type="number"
                                            className="border p-1 rounded text-sm w-16 text-center"
                                            value={editFormData.creditos}
                                            onChange={e => setEditFormData({...editFormData, creditos: Number(e.target.value)})}
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center gap-1 text-sm text-slate-600">
                                            <Award size={14} className="text-amber-500" />
                                            <span className="font-medium">{materia.creditos}</span>
                                        </div>
                                    )}
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        {editandoId === materia.id ? (
                                            <>
                                                <button onClick={() => guardarEdicion(materia.id!)} className="text-green-600 hover:bg-green-50 p-1 rounded">
                                                    <Check size={20} />
                                                </button>
                                                <button onClick={() => setEditandoId(null)} className="text-slate-400 hover:bg-slate-50 p-1 rounded">
                                                    <X size={20} />
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button onClick={() => iniciarEdicion(materia)} className="text-blue-500 hover:bg-blue-50 p-1 rounded transition">
                                                    <Edit size={18} />
                                                </button>
                                                <button onClick={() => materia.id && handleEliminar(materia.id)} className="text-red-400 hover:bg-red-50 p-1 rounded transition">
                                                    <Trash2 size={18} />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ListaMaterias;