import React, { useState } from 'react';
import axios from 'axios';
import { UserPlus, CheckCircle } from 'lucide-react';

const FormularioAlumno = ({ onAlumnoCreado }: { onAlumnoCreado: () => void }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        fechaNacimiento: ''
    });
    const [status, setStatus] = useState('');

    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/alumnos`, formData);
            setStatus('success');
            setFormData({ nombre: '', apellido: '', email: '', fechaNacimiento: '' });
            onAlumnoCreado(); // Refresca la lista automáticamente
            setTimeout(() => setStatus(''), 3000);
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <UserPlus className="text-green-600" /> Nuevo Alumno
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    type="text" placeholder="Nombre" required
                    className="p-2 border rounded"
                    value={formData.nombre}
                    onChange={e => setFormData({...formData, nombre: e.target.value})}
                />
                <input
                    type="text" placeholder="Apellido" required
                    className="p-2 border rounded"
                    value={formData.apellido}
                    onChange={e => setFormData({...formData, apellido: e.target.value})}
                />
                <input
                    type="email" placeholder="Email" required
                    className="p-2 border rounded"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                />
                <input
                    type="date" required
                    className="p-2 border rounded"
                    value={formData.fechaNacimiento}
                    onChange={e => setFormData({...formData, fechaNacimiento: e.target.value})}
                />
                <button type="submit" className="md:col-span-2 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
                    Registrar Alumno
                </button>
            </form>
            {status === 'success' && (
                <p className="mt-2 text-green-600 flex items-center gap-1 text-sm">
                    <CheckCircle size={16} /> ¡Alumno registrado con éxito!
                </p>
            )}
        </div>
    );
};

export default FormularioAlumno;