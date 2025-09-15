package com.luxkao.sistemaocorrencias.controller;

import com.luxkao.sistemaocorrencias.controller.dto.OcorrenciaDTO;
import com.luxkao.sistemaocorrencias.model.entities.Ocorrencia;
import com.luxkao.sistemaocorrencias.model.repository.OcorrenciaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ocorrencias")
@CrossOrigin("${cors.allowed-origins}")
public class OcorrenciaController {

    @Autowired
    private OcorrenciaRepository ocorrenciaRepository;

    @PostMapping
    public ResponseEntity<Void> createOcorrencia(@RequestBody OcorrenciaDTO ocorrenciaDTO) {
        ocorrenciaRepository.save(ocorrenciaDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    // Endpoint principal que lida com listagem e filtros
    @GetMapping
    public List<Ocorrencia> getOcorrencias(
            @RequestParam(required = false) String professorId,
            @RequestParam(required = false) String estudanteId) {

        if (professorId != null) {
            return ocorrenciaRepository.findByProfessor(professorId);
        } else if (estudanteId != null) {
            return ocorrenciaRepository.findByEstudante(estudanteId);
        } else {
            return ocorrenciaRepository.findAll();
        }
    }
}