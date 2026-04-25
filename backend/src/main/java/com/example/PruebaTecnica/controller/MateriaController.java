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

    // Listar materias [cite: 43]
    @GetMapping
    public List<Materia> listar() {
        return materiaRepository.findAll();
    }

    // Crear materia [cite: 42]
    @PostMapping
    public Materia crear(@RequestBody Materia materia) {
        return materiaRepository.save(materia);
    }

    // Consultar materia por id [cite: 44]
    @GetMapping("/{id}")
    public ResponseEntity<Materia> obtener(@PathVariable Long id) {
        return materiaRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Actualizar materia [cite: 45]
    @PutMapping("/{id}")
    public ResponseEntity<Materia> actualizar(@PathVariable Long id, @RequestBody Materia detalles) {
        return materiaRepository.findById(id).map(materia -> {
            materia.setNombre(detalles.getNombre());
            materia.setCodigo(detalles.getCodigo());
            materia.setCreditos(detalles.getCreditos());
            return ResponseEntity.ok(materiaRepository.save(materia));
        }).orElse(ResponseEntity.notFound().build());
    }

    // Eliminar materia [cite: 46]
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        materiaRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}