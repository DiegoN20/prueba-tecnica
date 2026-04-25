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

    public List<Alumno> listarTodos() {
        return alumnoRepository.findAll();
    }

    public Alumno guardar(Alumno alumno) {
        return alumnoRepository.save(alumno);
    }

    public Alumno buscarPorId(Long id) {
        return alumnoRepository.findById(id).orElse(null);
    }

    public void eliminar(Long id) {
        alumnoRepository.deleteById(id);
    }
}