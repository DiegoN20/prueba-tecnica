import React, { useState } from 'react';
import axios from 'axios';
import { BookOpen, CheckCircle } from 'lucide-react';

const FormularioMateria = ({ onMateriaCreada }: { onMateriaCreada: () => void }) => {
    const [formData, setFormData] = useState({ nombre: '', codigo: '', creditos: 0 });
    const [errores, setErrores] = useState<Record<string, string>>({});
    const [status, setStatus] = useState('');

    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrores({});

        // 1. Validación de Créditos (0-5)
        if (formData.creditos < 0 || formData.creditos > 5) {
            setErrores({ creditos: "Los créditos deben estar entre 0 y 5" });
            return;
        }

        // 2. Validación de formato de Código (Texto + Número)
        // Ejemplo: MAT123 (3 letras y 3 números)
        const codigoRegex = /^[A-Z]{3}\d{3}$/;
        if (!codigoRegex.test(formData.codigo)) {
            setErrores({ codigo: "Formato inválido. Use 3 letras y 3 números (Ej: MAT123)" });
            return;
        }

        try {
            await axios.post(`${API_URL}/materias`, formData);
            setStatus('success');
            setFormData({ nombre: '', codigo: '', creditos: 0 });
            onMateriaCreada();
            setTimeout(() => setStatus(''), 3000);
        } catch (error: any) {
            setStatus('error');
            if (error.response && error.response.data) {
                setErrores(error.response.data);
            }
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8 border-t-4 border-blue-600">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <BookOpen className="text-blue-600" /> Nueva Materia
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Campo Nombre */}
                <div className="flex flex-col gap-1">
                    <input
                        type="text" placeholder="Nombre de la Materia"
                        className={`p-2 border rounded focus:ring-2 outline-none ${errores.nombre ? 'border-red-500 ring-red-200' : 'focus:ring-blue-500'}`}
                        value={formData.nombre}
                        onChange={e => setFormData({...formData, nombre: e.target.value})}
                    />
                    {errores.nombre && <span className="text-[10px] text-red-500 font-bold px-1">{errores.nombre}</span>}
                </div>

                {/* Campo Código */}
                <div className="flex flex-col gap-1">
                    <input
                        type="text" placeholder="Código (ABC123)"
                        maxLength={6}
                        className={`p-2 border rounded focus:ring-2 outline-none ${errores.codigo ? 'border-red-500 ring-red-200' : 'focus:ring-blue-500'}`}
                        value={formData.codigo}
                        onChange={e => setFormData({...formData, codigo: e.target.value.toUpperCase()})}
                    />
                    {errores.codigo && <span className="text-[10px] text-red-500 font-bold px-1">{errores.codigo}</span>}
                </div>

                {/* Campo Créditos con validación 0-5 */}
                <div className="flex flex-col gap-1">
                    <input
                        type="number"
                        placeholder="Créditos (0-5)"
                        min="0"
                        max="5"
                        className={`p-2 border rounded focus:ring-2 outline-none ${errores.creditos ? 'border-red-500 ring-red-200' : 'focus:ring-blue-500'}`}
                        value={formData.creditos || ''}
                        onChange={e => {
                            const val = Number(e.target.value);
                            if (val <= 5) setFormData({...formData, creditos: val});
                        }}
                    />
                    {errores.creditos && <span className="text-[10px] text-red-500 font-bold px-1">{errores.creditos}</span>}
                </div>

                <button type="submit" className="md:col-span-3 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-medium active:scale-95">
                    Registrar Materia
                </button>
            </form>

            {status === 'success' && (
                <p className="mt-4 text-green-600 flex items-center gap-1 text-sm font-bold">
                    <CheckCircle size={16} /> ¡Materia registrada con éxito!
                </p>
            )}
        </div>
    );
};

export default FormularioMateria;