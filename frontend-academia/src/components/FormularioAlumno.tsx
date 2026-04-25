import React, { useState } from 'react';
import axios from 'axios';
import { UserPlus, CheckCircle, AlertTriangle } from 'lucide-react';

const FormularioAlumno = ({ onAlumnoCreado }: { onAlumnoCreado: () => void }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        fechaNacimiento: ''
    });

    const [errores, setErrores] = useState<Record<string, string>>({});
    const [status, setStatus] = useState('');

    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrores({});

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                setErrores({ email: "Por favor, ingresa un formato válido: texto@texto.texto" });
                return;
            }

        try {
            await axios.post(`${API_URL}/alumnos`, formData);
            setStatus('success');
            setFormData({ nombre: '', apellido: '', email: '', fechaNacimiento: '' });
            onAlumnoCreado();
            setTimeout(() => setStatus(''), 3000);
        } catch (error: any) {
            setStatus('error');
            if (error.response && error.response.data) {
                setErrores(error.response.data);
            }
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8 border border-slate-100">
            <h2 className="text-xl font-bold mb-4 text-slate-800 flex items-center gap-2">
                <UserPlus className="text-green-600" /> Nuevo Alumno
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                    <input
                        type="text" placeholder="Nombre"
                        className={`p-2 border rounded outline-none transition ${errores.nombre ? 'border-red-500 bg-red-50' : 'border-slate-300 focus:border-green-500'}`}
                        value={formData.nombre}
                        onChange={e => setFormData({...formData, nombre: e.target.value})}
                    />
                    {errores.nombre && <span className="text-[10px] text-red-600 font-medium px-1">{errores.nombre}</span>}
                </div>

                <div className="flex flex-col gap-1">
                    <input
                        type="text" placeholder="Apellido"
                        className={`p-2 border rounded outline-none transition ${errores.apellido ? 'border-red-500 bg-red-50' : 'border-slate-300 focus:border-green-500'}`}
                        value={formData.apellido}
                        onChange={e => setFormData({...formData, apellido: e.target.value})}
                    />
                    {errores.apellido && <span className="text-[10px] text-red-600 font-medium px-1">{errores.apellido}</span>}
                </div>

                <div className="flex flex-col gap-1">
                    <input
                        type="email" placeholder="Email"
                        className={`p-2 border rounded outline-none transition ${errores.email ? 'border-red-500 bg-red-50' : 'border-slate-300 focus:border-green-500'}`}
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                    {errores.email && <span className="text-[10px] text-red-600 font-medium px-1">{errores.email}</span>}
                </div>

                <div className="flex flex-col gap-1">
                    <input
                        type="date"
                        className="p-2 border border-slate-300 rounded outline-none focus:border-green-500 transition"
                        value={formData.fechaNacimiento}
                        onChange={e => setFormData({...formData, fechaNacimiento: e.target.value})}
                    />
                </div>

                <button type="submit" className="md:col-span-2 bg-green-600 text-white py-2.5 rounded font-bold hover:bg-green-700 transition shadow-sm active:scale-95">
                    Registrar Alumno
                </button>
            </form>

            {status === 'success' && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700 text-sm animate-bounce">
                    <CheckCircle size={18} /> ¡Alumno registrado con éxito!
                </div>
            )}

            {status === 'error' && !Object.keys(errores).length && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700 text-sm">
                    <AlertTriangle size={18} /> Hubo un problema con el servidor.
                </div>
            )}
        </div>
    );
};

export default FormularioAlumno;