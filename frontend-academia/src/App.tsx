import React, { useState } from 'react';
import RegistroNotas from './components/RegistroNotas';
import ListaAlumnos from './components/ListaAlumnos';
import FormularioAlumno from './components/FormularioAlumno';
import FormularioMateria from './components/FormularioMateria';
import ListaMaterias from './components/ListaMaterias';

import { BookOpen, Users, GraduationCap, LayoutDashboard, BookmarkCheck } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('alumnos');
  const [refreshKey, setRefreshKey] = useState(0);
  const [refreshMaterias, setRefreshMaterias] = useState(0);

  const handleAlumnoCreado = () => setRefreshKey(prev => prev + 1);
  const handleMateriaCreada = () => setRefreshMaterias(prev => prev + 1);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar Lateral */}
      <aside className="w-full md:w-64 bg-slate-900 text-white p-6">
        <div className="flex items-center gap-3 mb-10">
          <GraduationCap size={32} className="text-blue-400" />
          <span className="text-xl font-bold tracking-tight">AcademiaPro</span>
        </div>

        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab('alumnos')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === 'alumnos' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            <Users size={20} /> Gestión Alumnos
          </button>
          <button
            onClick={() => setActiveTab('materias')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === 'materias' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
            >
              <BookmarkCheck size={20} /> Gestión Materias
            </button>
          <button
            onClick={() => setActiveTab('notas')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === 'notas' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            <BookOpen size={20} /> Registro de Notas
          </button>
        </nav>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 p-4 md:p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-800">
              {activeTab === 'alumnos' && 'Panel de Alumnos'}
              {activeTab === 'materias' && 'Panel de Materias'}
              {activeTab === 'notas' && 'Calificaciones'}
            </h2>
            <p className="text-slate-500">Prueba Técnica - Full Stack Developer</p>
          </div>
          <div className="hidden md:block bg-white p-2 rounded-full shadow-sm">
             <LayoutDashboard className="text-slate-400" />
          </div>
        </header>

        <div className="max-w-5xl">
          {activeTab === 'alumnos' && (
            <div className="animate-in fade-in duration-500">
              <FormularioAlumno onAlumnoCreado={handleAlumnoCreado} />
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 text-slate-700">Listado Alumnos</h3>
                <ListaAlumnos key={refreshKey} />
              </div>
            </div>
          )}

          {activeTab === 'materias' && (
            <div className="animate-in fade-in duration-500">
              <FormularioMateria onMateriaCreada={handleMateriaCreada} />
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 text-slate-700">Listado de Materias</h3>
                <ListaMaterias key={refreshMaterias} />
              </div>
            </div>
          )}

          {activeTab === 'notas' && (
            <div className="animate-in slide-in-from-bottom-4 duration-500">
              <RegistroNotas />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;