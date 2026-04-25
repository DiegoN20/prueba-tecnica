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
    private Long id;

    @Column(nullable = false)
    private Double valor;

    @Column(name = "fecha_registro")
    private LocalDateTime fechaRegistro = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "alumno_id", nullable = false)
    @JsonIgnoreProperties("notas")
    private Alumno alumno;

    @ManyToOne
    @JoinColumn(name = "materia_id", nullable = false)
    @JsonIgnoreProperties("notas")
    private Materia materia;
}
