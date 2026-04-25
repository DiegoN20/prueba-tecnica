import React, { useState } from 'react';
import axios from 'axios';
import { BookOpen, CheckCircle } from 'lucide-react';

const FormularioMateria = ({ onMateriaCreada }: { onMateriaCreada: () => void }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        codigo: '',
        creditos: 0
    });
    const [status, setStatus] = useState('');

    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/materias`, formData);
            setStatus('success');
            setFormData({ nombre: '', codigo: '', creditos: 0 });
            onMateriaCreada();
            setTimeout(() => setStatus(''), 3000);
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8 border-t-4 border-blue-600">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <BookOpen className="text-blue-600" /> Nueva Materia
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                    type="text" placeholder="Nombre de la Materia" required
                    className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.nombre}
                    onChange={e => setFormData({...formData, nombre: e.target.value})}
                />
                <input
                    type="text" placeholder="Código (Ej: MAT-101)" required
                    className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.codigo}
                    onChange={e => setFormData({...formData, codigo: e.target.value})}
                />
                <input
                    type="number" placeholder="Créditos" required min="1"
                    className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.creditos || ''}
                    onChange={e => setFormData({...formData, creditos: Number(e.target.value)})}
                />
                <button type="submit" className="md:col-span-3 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-medium">
                    Registrar Materia
                </button>
            </form>
            {status === 'success' && (
                <p className="mt-2 text-green-600 flex items-center gap-1 text-sm">
                    <CheckCircle size={16} /> ¡Materia registrada con éxito!
                </p>
            )}
            {status === 'error' && (
                <p className="mt-2 text-red-600 text-sm">Error al registrar la materia. Verifica el backend.</p>
            )}
        </div>
    );
};

export default FormularioMateria;