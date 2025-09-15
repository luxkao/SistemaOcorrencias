package com.luxkao.sistemaocorrencias.model.repository;

import com.luxkao.sistemaocorrencias.controller.dto.OcorrenciaDTO;
import com.luxkao.sistemaocorrencias.model.entities.Estudante;
import com.luxkao.sistemaocorrencias.model.entities.Ocorrencia;
import com.luxkao.sistemaocorrencias.model.entities.Professor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class OcorrenciaRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final RowMapper<Ocorrencia> ocorrenciaRowMapper = (rs, rowNum) -> {
        Ocorrencia ocorrencia = new Ocorrencia();
        ocorrencia.setId(rs.getInt("o_id"));
        ocorrencia.setData(rs.getDate("o_data"));
        ocorrencia.setLocal(rs.getString("o_local"));
        ocorrencia.setDescricao(rs.getString("o_descricao"));
        ocorrencia.setInfoAdicional(rs.getString("o_info_adicional"));

        Professor professor = new Professor();
        professor.setCodigo(rs.getString("p_codigo"));
        professor.setNome(rs.getString("p_nome"));
        professor.setCurso(rs.getString("p_curso"));
        professor.setMateriaLecionada(rs.getString("p_materia_lecionada"));

        Estudante estudante = new Estudante();
        estudante.setMatricula(rs.getString("e_matricula"));
        estudante.setNome(rs.getString("e_nome"));
        estudante.setCurso(rs.getString("e_curso"));
        estudante.setAnoEntrada(rs.getInt("e_ano_entrada"));

        ocorrencia.setDenunciante(professor);
        ocorrencia.setDenunciado(estudante);

        return ocorrencia;
    };

    private final String BASE_SELECT_SQL = "SELECT " +
            "o.id as o_id, o.data as o_data, o.local as o_local, o.descricao as o_descricao, o.info_adicional as o_info_adicional, " +
            "p.codigo as p_codigo, p.nome as p_nome, p.curso as p_curso, p.materia_lecionada as p_materia_lecionada, " +
            "e.matricula as e_matricula, e.nome as e_nome, e.curso as e_curso, e.ano_entrada as e_ano_entrada " +
            "FROM ocorrencias o " +
            "JOIN professores p ON o.professor_codigo = p.codigo " +
            "JOIN estudantes e ON o.estudante_matricula = e.matricula";

    public void save(OcorrenciaDTO dto) {
        String sql = "INSERT INTO ocorrencias (data, local, descricao, info_adicional, professor_codigo, estudante_matricula) VALUES (?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql,
                dto.getData(),
                dto.getLocal(),
                dto.getDescricao(),
                dto.getInfoAdicional(),
                dto.getProfessorCodigo(),
                dto.getEstudanteMatricula());
    }

    public List<Ocorrencia> findAll() {
        return jdbcTemplate.query(BASE_SELECT_SQL, ocorrenciaRowMapper);
    }

    public List<Ocorrencia> findByProfessor(String professorCodigo) {
        String sql = BASE_SELECT_SQL + " WHERE p.codigo = ?";
        return jdbcTemplate.query(sql, new Object[]{professorCodigo}, ocorrenciaRowMapper);
    }

    public List<Ocorrencia> findByEstudante(String estudanteMatricula) {
        String sql = BASE_SELECT_SQL + " WHERE e.matricula = ?";
        return jdbcTemplate.query(sql, new Object[]{estudanteMatricula}, ocorrenciaRowMapper);
    }
}