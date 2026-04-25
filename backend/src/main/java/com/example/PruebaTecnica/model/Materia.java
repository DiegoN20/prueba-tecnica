package com.example.PruebaTecnica.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Entity
@Table(name = "materias")
@Getter
@Setter
public class Materia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; //

    @Column(nullable = false)
    private String nombre; //

    @Column(nullable = false, unique = true)
    private String codigo; //

    private Integer creditos; //

    // Una materia puede tener muchas notas [cite: 29]
    @OneToMany(mappedBy = "materia")
    @JsonIgnoreProperties("materia")
    private List<Nota> notas;
}
