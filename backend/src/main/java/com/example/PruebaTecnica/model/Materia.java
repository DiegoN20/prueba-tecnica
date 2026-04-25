package com.example.PruebaTecnica.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
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
    private Long id;

    @NotBlank(message = "El nombre de la materia es obligatorio")
    @Size(min = 3, max = 100, message = "El nombre debe tener entre 3 y 100 caracteres")
    @Column(nullable = false)
    private String nombre;

    @NotBlank(message = "El código es obligatorio")
    @Pattern(regexp = "^[A-Z]{3}\\d{3}$", message = "El código debe tener formato AAA123 (3 letras y 3 números)")
    @Column(nullable = false, unique = true)
    private String codigo;

    @NotNull(message = "Los créditos son obligatorios")
    @Min(value = 1, message = "Mínimo 1 crédito")
    @Max(value = 5, message = "Máximo 5 créditos")
    private Integer creditos;

    @OneToMany(mappedBy = "materia", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("materia")
    private List<Nota> notas;
}
