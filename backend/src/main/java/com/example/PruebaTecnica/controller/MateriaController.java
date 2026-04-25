package com.example.PruebaTecnica.controller;

import com.example.PruebaTecnica.model.Materia;
import com.example.PruebaTecnica.service.MateriaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/materias")
@CrossOrigin(origins = "*")
public class MateriaController {

    @Autowired
    private MateriaService materiaService;

    @GetMapping
    public List<Materia> listar() {
        return materiaService.listarTodas();
    }

    @PostMapping
    public ResponseEntity<?> guardar(@Valid @RequestBody Materia materia) {
        return ResponseEntity.ok(materiaService.guardar(materia));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Materia> obtener(@PathVariable Long id) {
        return materiaService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizar(@PathVariable Long id, @Valid @RequestBody Materia detalles) {
        return materiaService.buscarPorId(id).map(materia -> {
            materia.setNombre(detalles.getNombre());
            materia.setCodigo(detalles.getCodigo());
            materia.setCreditos(detalles.getCreditos());
            return ResponseEntity.ok(materiaService.guardar(materia));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (materiaService.buscarPorId(id).isPresent()) {
            materiaService.eliminar(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}