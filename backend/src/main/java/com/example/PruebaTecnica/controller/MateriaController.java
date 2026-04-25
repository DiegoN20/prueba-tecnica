package com.example.PruebaTecnica.controller;

import com.example.PruebaTecnica.model.Materia;
import com.example.PruebaTecnica.repository.MateriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/materias")
@CrossOrigin(origins = "*")
public class MateriaController {

    @Autowired
    private MateriaRepository materiaRepository;

    @GetMapping
    public List<Materia> listar() {
        return materiaRepository.findAll();
    }

    @PostMapping
    public Materia crear(@RequestBody Materia materia) {
        return materiaRepository.save(materia);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Materia> obtener(@PathVariable Long id) {
        return materiaRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Materia> actualizar(@PathVariable Long id, @RequestBody Materia detalles) {
        return materiaRepository.findById(id).map(materia -> {
            materia.setNombre(detalles.getNombre());
            materia.setCodigo(detalles.getCodigo());
            materia.setCreditos(detalles.getCreditos());
            return ResponseEntity.ok(materiaRepository.save(materia));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        materiaRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}