package com.example.PruebaTecnica.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "notas")
@Getter
@Setter
public class Nota {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // [cite: 30]

    @Column(nullable = false)
    private Double valor; // [cite: 30]

    @Column(name = "fecha_registro")
    private LocalDateTime fechaRegistro = LocalDateTime.now(); // [cite: 30]

    @ManyToOne
    @JoinColumn(name = "alumno_id", nullable = false)
    @JsonIgnoreProperties("notas")
    private Alumno alumno; // Relación Many-to-One con Alumno [cite: 31]

    @ManyToOne
    @JoinColumn(name = "materia_id", nullable = false)
    @JsonIgnoreProperties("notas")
    private Materia materia; // Relación Many-to-One con Materia [cite: 31]
}
