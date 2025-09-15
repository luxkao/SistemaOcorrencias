package com.luxkao.sistemaocorrencias.model.repository;

import com.luxkao.sistemaocorrencias.model.entities.Professor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Repository
public class ProfessorRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final RowMapper<Professor> professorRowMapper = (rs, rowNum) -> {
        Professor professor = new Professor();
        professor.setCodigo(rs.getString("codigo"));
        professor.setNome(rs.getString("nome"));
        professor.setCurso(rs.getString("curso"));
        professor.setMateriaLecionada(rs.getString("materia_lecionada"));
        return professor;
    };

    public Professor save(Professor professor) {
        String sql = "INSERT INTO professores (codigo, nome, curso, materia_lecionada) VALUES (?, ?, ?, ?)";
        jdbcTemplate.update(sql, professor.getCodigo(), professor.getNome(), professor.getCurso(), professor.getMateriaLecionada());
        return professor;
    }

    public List<Professor> findAll() {
        String sql = "SELECT * FROM professores";
        return jdbcTemplate.query(sql, professorRowMapper);
    }

    public Optional<Professor> findById(String codigo) {
        String sql = "SELECT * FROM professores WHERE codigo = ?";
        try {
            Professor professor = jdbcTemplate.queryForObject(sql, new Object[]{codigo}, professorRowMapper);
            return Optional.ofNullable(professor);
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Professor update(String codigo, Professor professor) {
        String sql = "UPDATE professores SET nome = ?, curso = ?, materia_lecionada = ? WHERE codigo = ?";
        jdbcTemplate.update(sql, professor.getNome(), professor.getCurso(), professor.getMateriaLecionada(), codigo);
        professor.setCodigo(codigo); // Garante que o código retornado está correto
        return professor;
    }

    public void deleteById(String codigo) {
        String sql = "DELETE FROM professores WHERE codigo = ?";
        jdbcTemplate.update(sql, codigo);
    }
}