package com.luxkao.sistemaocorrencias.controller;

import com.luxkao.sistemaocorrencias.model.entities.Professor;
import com.luxkao.sistemaocorrencias.model.repository.ProfessorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/professores")
@CrossOrigin("${cors.allowed-origins}")
public class ProfessorController {

    @Autowired
    private ProfessorRepository professorRepository;

    @PostMapping
    public ResponseEntity<Professor> createProfessor(@RequestBody Professor professor) {
        Professor savedProfessor = professorRepository.save(professor);
        return new ResponseEntity<>(savedProfessor, HttpStatus.CREATED);
    }

    @GetMapping
    public List<Professor> getAllProfessores() {
        return professorRepository.findAll();
    }

    @GetMapping("/{codigo}")
    public ResponseEntity<Professor> getProfessorById(@PathVariable String codigo) {
        return professorRepository.findById(codigo)
                .map(professor -> new ResponseEntity<>(professor, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{codigo}")
    public ResponseEntity<Professor> updateProfessor(@PathVariable String codigo, @RequestBody Professor professorDetails) {
        return professorRepository.findById(codigo)
                .map(professor -> {
                    Professor updatedProfessor = professorRepository.update(codigo, professorDetails);
                    return new ResponseEntity<>(updatedProfessor, HttpStatus.OK);
                })
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{codigo}")
    public ResponseEntity<Void> deleteProfessor(@PathVariable String codigo) {
        return professorRepository.findById(codigo)
                .map(professor -> {
                    professorRepository.deleteById(codigo);
                    return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
                })
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}