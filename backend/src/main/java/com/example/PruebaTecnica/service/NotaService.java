package com.example.PruebaTecnica.service;

import com.example.PruebaTecnica.model.Nota;
import com.example.PruebaTecnica.repository.NotaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class NotaService {

    @Autowired
    private NotaRepository notaRepository;

    public List<Nota> listarTodas() {
        return notaRepository.findAll();
    }

    public Nota guardar(Nota nota) {
        if (nota.getValor() < 0.0 || nota.getValor() > 5.0) {
            throw new IllegalArgumentException("La calificación debe estar entre 0.0 y 5.0");
        }
        return notaRepository.save(nota);
    }

    public Nota buscarPorId(Long id) {
        return notaRepository.findById(id).orElse(null);
    }

    public void eliminar(Long id) {
        notaRepository.deleteById(id);
    }

    public List<Nota> buscarPorAlumno(Long alumnoId) {
        return notaRepository.findByAlumnoId(alumnoId);
    }
}