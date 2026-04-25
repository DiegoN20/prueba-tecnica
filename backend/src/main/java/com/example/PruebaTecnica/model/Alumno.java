package com.example.PruebaTecnica.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "alumnos")
@Getter
@Setter
public class Alumno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // [cite: 25]

    @Column(nullable = false)
    private String nombre; // [cite: 25]

    @Column(nullable = false)
    private String apellido; // [cite: 25]

    @Column(nullable = false, unique = true)
    private String email; // [cite: 25]

    @Column(name = "fecha_nacimiento")
    private LocalDate fechaNacimiento; // [cite: 25]

    // Relación One-to-Many: un alumno puede tener muchas notas
    // 'mappedBy' indica que el campo 'alumno' en la clase Nota es el dueño de la relación
    @OneToMany(mappedBy = "alumno", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("alumno")
    private List<Nota> notas;
}
