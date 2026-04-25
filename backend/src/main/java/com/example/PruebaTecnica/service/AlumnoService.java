package com.example.PruebaTecnica.service;

import com.example.PruebaTecnica.model.Alumno;
import com.example.PruebaTecnica.repository.AlumnoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AlumnoService {

    @Autowired
    private AlumnoRepository alumnoRepository;

    // Requerimiento: Listar todos los alumnos [cite: 36, 84]
    public List<Alumno> listarTodos() {
        return alumnoRepository.findAll();
    }

    // Requerimiento: Crear o Actualizar alumno [cite: 35, 38, 85, 86]
    public Alumno guardar(Alumno alumno) {
        return alumnoRepository.save(alumno);
    }

    // Requerimiento: Consultar por id [cite: 37]
    public Alumno buscarPorId(Long id) {
        return alumnoRepository.findById(id).orElse(null);
    }

    // Requerimiento: Eliminar alumno [cite: 41, 87]
    public void eliminar(Long id) {
        alumnoRepository.deleteById(id);
    }
}