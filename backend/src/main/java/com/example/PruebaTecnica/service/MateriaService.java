package com.example.PruebaTecnica.service;

import com.example.PruebaTecnica.model.Materia;
import com.example.PruebaTecnica.repository.MateriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MateriaService {

    @Autowired
    private MateriaRepository materiaRepository;

    public List<Materia> listarTodas() {
        return materiaRepository.findAll();
    }

    public Materia guardar(Materia materia) {
        return materiaRepository.save(materia);
    }

    // Cambiamos a Optional para que el Controller decida qué hacer si no existe
    public java.util.Optional<Materia> buscarPorId(Long id) {
        return materiaRepository.findById(id);
    }

    public void eliminar(Long id) {
        materiaRepository.deleteById(id);
    }
}