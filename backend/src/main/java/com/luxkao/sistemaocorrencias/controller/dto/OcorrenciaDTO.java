package com.luxkao.sistemaocorrencias.controller.dto;

import java.util.Date;

public class OcorrenciaDTO {
    private Date data;
    private String local;
    private String descricao;
    private String infoAdicional;
    private String professorCodigo;
    private String estudanteMatricula;

    public Date getData() {
        return data;
    }

    public void setData(Date data) {
        this.data = data;
    }

    public String getLocal() {
        return local;
    }

    public void setLocal(String local) {
        this.local = local;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getInfoAdicional() {
        return infoAdicional;
    }

    public void setInfoAdicional(String infoAdicional) {
        this.infoAdicional = infoAdicional;
    }

    public String getProfessorCodigo() {
        return professorCodigo;
    }

    public void setProfessorCodigo(String professorCodigo) {
        this.professorCodigo = professorCodigo;
    }

    public String getEstudanteMatricula() {
        return estudanteMatricula;
    }

    public void setEstudanteMatricula(String estudanteMatricula) {
        this.estudanteMatricula = estudanteMatricula;
    }
}