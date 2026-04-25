package com.example.PruebaTecnica.controller;

import com.example.PruebaTecnica.model.Alumno;
import com.example.PruebaTecnica.service.AlumnoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alumnos")
@CrossOrigin(origins = "*")
public class AlumnoController {

    @Autowired
    private AlumnoService alumnoService;

    @GetMapping
    public List<Alumno> listarAlumnos() {
        return alumnoService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Alumno> obtenerAlumno(@PathVariable Long id) {
        Alumno alumno = alumnoService.buscarPorId(id);
        return alumno != null ? ResponseEntity.ok(alumno) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public Alumno crearAlumno(@RequestBody Alumno alumno) {
        return alumnoService.guardar(alumno);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Alumno> actualizarAlumno(@PathVariable Long id, @RequestBody Alumno alumnoDetalles) {
        Alumno alumno = alumnoService.buscarPorId(id);
        if (alumno == null) return ResponseEntity.notFound().build();

        alumno.setNombre(alumnoDetalles.getNombre());
        alumno.setApellido(alumnoDetalles.getApellido());
        alumno.setEmail(alumnoDetalles.getEmail());
        alumno.setFechaNacimiento(alumnoDetalles.getFechaNacimiento());

        return ResponseEntity.ok(alumnoService.guardar(alumno));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarAlumno(@PathVariable Long id) {
        alumnoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}