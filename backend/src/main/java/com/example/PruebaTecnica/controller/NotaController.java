package com.example.PruebaTecnica.controller;

import com.example.PruebaTecnica.model.Alumno;
import com.example.PruebaTecnica.model.Materia;
import com.example.PruebaTecnica.model.Nota;
import com.example.PruebaTecnica.repository.AlumnoRepository;
import com.example.PruebaTecnica.repository.MateriaRepository;
import com.example.PruebaTecnica.repository.NotaRepository;
import lombok.Getter;
import lombok.Setter;
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

    @PostMapping
    public ResponseEntity<?> registrarNota(@RequestBody NotaRequest request) {
        Alumno alumno = alumnoRepository.findById(request.getAlumnoId()).orElse(null);
        Materia materia = materiaRepository.findById(request.getMateriaId()).orElse(null);

        if (alumno == null || materia == null) {
            return ResponseEntity.badRequest().body("Alumno o Materia no encontrados");
        }

        Nota nota = new Nota();
        nota.setValor(request.getValor());
        nota.setAlumno(alumno);
        nota.setMateria(materia);

        return ResponseEntity.ok(notaRepository.save(nota));
    }

    @GetMapping("/alumno/{alumnoId}")
    public List<Nota> listarPorAlumno(@PathVariable Long alumnoId) {
        return notaRepository.findByAlumnoId(alumnoId);
    }

    @Getter
    @Setter
    static class NotaRequest {
        private Long alumnoId;
        private Long materiaId;
        private Double valor;
    }
}