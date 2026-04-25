package com.example.PruebaTecnica.controller;

import com.example.PruebaTecnica.model.Alumno;
import com.example.PruebaTecnica.model.Materia;
import com.example.PruebaTecnica.model.Nota;
import com.example.PruebaTecnica.repository.AlumnoRepository;
import com.example.PruebaTecnica.repository.MateriaRepository;
import com.example.PruebaTecnica.repository.NotaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notas")
@CrossOrigin(origins = "*")
public class NotaController {

    @Autowired
    private NotaRepository notaRepository;

    @Autowired
    private AlumnoRepository alumnoRepository;

    @Autowired
    private MateriaRepository materiaRepository;

    @PostMapping("/alumno/{alumnoId}/materia/{materiaId}")
    public ResponseEntity<Nota> registrarNota(
            @PathVariable Long alumnoId,
            @PathVariable Long materiaId,
            @RequestBody Nota nota) {

        Alumno alumno = alumnoRepository.findById(alumnoId).orElse(null);
        Materia materia = materiaRepository.findById(materiaId).orElse(null);

        if (alumno == null || materia == null) {
            return ResponseEntity.notFound().build();
        }

        nota.setAlumno(alumno);
        nota.setMateria(materia);

        return ResponseEntity.ok(notaRepository.save(nota));
    }

    @GetMapping("/alumno/{alumnoId}")
    public List<Nota> listarPorAlumno(@PathVariable Long alumnoId) {
        return notaRepository.findByAlumnoId(alumnoId);
    }
}