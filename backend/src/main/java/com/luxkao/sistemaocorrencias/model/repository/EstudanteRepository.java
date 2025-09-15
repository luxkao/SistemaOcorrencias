package com.luxkao.sistemaocorrencias.model.repository;

import org.springframework.beans.factory.annotation.Autowired;
import com.luxkao.sistemaocorrencias.model.entities.Estudante;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.Calendar;
import java.util.List;
import java.util.Optional;

@Repository
public class EstudanteRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final RowMapper<Estudante> estudanteRowMapper = (rs, rowNum) -> {
        Estudante estudante = new Estudante();
        estudante.setMatricula(rs.getString("matricula"));
        estudante.setNome(rs.getString("nome"));
        estudante.setCurso(rs.getString("curso"));
        estudante.setAnoEntrada(rs.getInt("ano_entrada"));
        return estudante;
    };

    private String gerarProximaMatricula() {
        int anoAtual = Calendar.getInstance().get(Calendar.YEAR);
        String prefixo = String.valueOf(anoAtual);

        String sqlBusca = "SELECT MAX(matricula) FROM estudantes WHERE matricula LIKE ?";
        String ultimaMatricula = jdbcTemplate.queryForObject(sqlBusca, new Object[]{prefixo + "%"}, String.class);

        int proximoSequencial = 1;
        if (ultimaMatricula != null) {
            int ultimoSequencial = Integer.parseInt(ultimaMatricula.substring(prefixo.length()));
            proximoSequencial = ultimoSequencial + 1;
        }

        return prefixo + String.format("%03d", proximoSequencial);
    }

    public Estudante save(Estudante estudante) {
        String novaMatricula = gerarProximaMatricula();
        estudante.setMatricula(novaMatricula);

        String sql = "INSERT INTO estudantes (matricula, nome, curso, ano_entrada) VALUES (?, ?, ?, ?)";
        jdbcTemplate.update(sql, estudante.getMatricula(), estudante.getNome(), estudante.getCurso(), estudante.getAnoEntrada());
        return estudante;
    }

    public List<Estudante> findAll() {
        String sql = "SELECT * FROM estudantes";
        return jdbcTemplate.query(sql, estudanteRowMapper);
    }

    public Optional<Estudante> findById(String matricula) {
        String sql = "SELECT * FROM estudantes WHERE matricula = ?";
        try {
            Estudante estudante = jdbcTemplate.queryForObject(sql, new Object[]{matricula}, estudanteRowMapper);
            return Optional.ofNullable(estudante);
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Estudante update(String matricula, Estudante estudante) {
        String sql = "UPDATE estudantes SET nome = ?, curso = ?, ano_entrada = ? WHERE matricula = ?";
        jdbcTemplate.update(sql, estudante.getNome(), estudante.getCurso(), estudante.getAnoEntrada(), matricula);
        estudante.setMatricula(matricula);
        return estudante;
    }

    public void deleteById(String matricula) {
        String sql = "DELETE FROM estudantes WHERE matricula = ?";
        jdbcTemplate.update(sql, matricula);
    }
}