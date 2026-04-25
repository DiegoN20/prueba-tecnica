import React, { useState, useEffect } from 'react';
import { alumnoService, materiaService, notaService } from '../services/api'; // Cambiado a servicios
import { Alumno, Materia } from '../types';
import { Save, AlertCircle, CheckCircle2 } from 'lucide-react';

const RegistroNotas = () => {
    const [alumnos, setAlumnos] = useState<Alumno[]>([]);
    const [materias, setMaterias] = useState<Materia[]>([]);
    const [selectedAlumno, setSelectedAlumno] = useState('');
    const [selectedMateria, setSelectedMateria] = useState('');
    const [valor, setValor] = useState('');
    const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                // Usando los servicios centralizados
                const [resAlumnos, resMaterias] = await Promise.all([
                    alumnoService.getAll(),
                    materiaService.getAll()
                ]);
                setAlumnos(resAlumnos.data);
                setMaterias(resMaterias.data);
            } catch (error) {
                setMensaje({ tipo: 'error', texto: 'Error al cargar datos iniciales' });
            }
        };
        cargarDatos();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // --- VALIDACIÓN DE NEGOCIO ---
        const notaNum = parseFloat(valor);
        if (isNaN(notaNum) || notaNum < 0 || notaNum > 5) {
            setMensaje({ tipo: 'error', texto: 'La nota debe estar entre 0.0 y 5.0' });
            return;
        }

        if (!selectedAlumno || !selectedMateria) {
            setMensaje({ tipo: 'error', texto: 'Seleccione alumno y materia' });
            return;
        }

        try {
            // Usando el servicio de notas con los IDs correspondientes
            await notaService.create({
                alumnoId: parseInt(selectedAlumno),
                materiaId: parseInt(selectedMateria),
                valor: notaNum
            });

            setMensaje({ tipo: 'success', texto: '¡Nota registrada exitosamente!' });
            setValor('');
            setSelectedAlumno('');
            setSelectedMateria('');

            // Limpiar mensaje después de 3 segundos
            setTimeout(() => setMensaje({ tipo: '', texto: '' }), 3000);
        } catch (error: any) {
            setMensaje({
                tipo: 'error',
                texto: error.response?.data?.message || 'Error al registrar la nota'
            });
        }
    };

    return (
        <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg border border-slate-100">
            <h2 className="text-2xl font-bold mb-6 text-slate-800 flex items-center gap-2">
                <Save className="text-blue-600" /> Registro de Calificación
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Alumno</label>
                    <select
                        className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                        value={selectedAlumno}
                        onChange={(e) => setSelectedAlumno(e.target.value)}
                        required
                    >
                        <option value="">Seleccione un alumno</option>
                        {alumnos.map(a => (
                            <option key={a.id} value={a.id}>{a.nombre} {a.apellido}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Materia</label>
                    <select
                        className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                        value={selectedMateria}
                        onChange={(e) => setSelectedMateria(e.target.value)}
                        required
                    >
                        <option value="">Seleccione una materia</option>
                        {materias.map(m => (
                            <option key={m.id} value={m.id}>{m.nombre}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Nota Final</label>
                    <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                        placeholder="Rango 0.0 a 5.0"
                        required
                    />
                    <p className="text-[10px] text-slate-400 mt-1 italic">* Use punto para decimales (ej: 4.5)</p>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 shadow-md shadow-blue-200 transition-all active:transform active:scale-95"
                >
                    Confirmar Calificación
                </button>
            </form>

            {mensaje.texto && (
                <div className={`mt-6 p-4 rounded-lg flex items-center gap-3 animate-in fade-in slide-in-from-top-2 ${
                    mensaje.tipo === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                    {mensaje.tipo === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                    <span className="text-sm font-medium">{mensaje.texto}</span>
                </div>
            )}
        </div>
    );
};

export default RegistroNotas;