package com.luxkao.sistemaocorrencias.controller;

import com.luxkao.sistemaocorrencias.model.entities.Estudante;
import com.luxkao.sistemaocorrencias.model.repository.EstudanteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/estudantes")
@CrossOrigin("${cors.allowed-origins}")
public class EstudanteController {

    @Autowired
    private EstudanteRepository estudanteRepository;

    @PostMapping
    public ResponseEntity<Estudante> createEstudante(@RequestBody Estudante estudante) {
        Estudante savedEstudante = estudanteRepository.save(estudante);
        return new ResponseEntity<>(savedEstudante, HttpStatus.CREATED);
    }

    @GetMapping
    public List<Estudante> getAllEstudantes() {
        return estudanteRepository.findAll();
    }

    @GetMapping("/{matricula}")
    public ResponseEntity<Estudante> getEstudanteById(@PathVariable String matricula) {
        return estudanteRepository.findById(matricula)
                .map(estudante -> new ResponseEntity<>(estudante, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{matricula}")
    public ResponseEntity<Estudante> updateEstudante(@PathVariable String matricula, @RequestBody Estudante estudanteDetails) {
        return estudanteRepository.findById(matricula)
                .map(estudante -> {
                    Estudante updatedEstudante = estudanteRepository.update(matricula, estudanteDetails);
                    return new ResponseEntity<>(updatedEstudante, HttpStatus.OK);
                })
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{matricula}")
    public ResponseEntity<Void> deleteEstudante(@PathVariable String matricula) {
        return estudanteRepository.findById(matricula)
                .map(estudante -> {
                    estudanteRepository.deleteById(matricula);
                    return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
                })
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}