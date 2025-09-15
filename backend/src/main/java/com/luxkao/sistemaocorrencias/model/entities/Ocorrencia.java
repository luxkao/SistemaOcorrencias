package com.luxkao.sistemaocorrencias.model.entities;

import java.util.Date;

public class Ocorrencia {
    private int id;
    private Date data;
    private String local;
    private String descricao;
    private String infoAdicional;

    private Professor denunciante;
    private Estudante denunciado;

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public Date getData() { return data; }
    public void setData(Date data) { this.data = data; }
    public String getLocal() { return local; }
    public void setLocal(String local) { this.local = local; }
    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
    public String getInfoAdicional() { return infoAdicional; }
    public void setInfoAdicional(String infoAdicional) { this.infoAdicional = infoAdicional; }
    public Professor getDenunciante() { return denunciante; }
    public void setDenunciante(Professor denunciante) { this.denunciante = denunciante; }
    public Estudante getDenunciado() { return denunciado; }
    public void setDenunciado(Estudante denunciado) { this.denunciado = denunciado; }
}