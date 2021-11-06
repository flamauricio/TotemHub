package com.mycompany.login.agente;

public class Usuario {
   
    private Integer id_agente; 
    private String login_agente;
    private String senha_agente;
    private Integer fk_estacao;
    private Integer fk_empresa;

    public Integer getId_agente() {
        return id_agente;
    }

    public void setId_agente(Integer id_agente) {
        this.id_agente = id_agente;
    }

    public String getLogin_agente() {
        return login_agente;
    }

    public void setLogin_agente(String login_agente) {
        this.login_agente = login_agente;
    }

    public String getSenha_agente() {
        return senha_agente;
    }

    public void setSenha_agente(String senha_agente) {
        this.senha_agente = senha_agente;
    }

    public Integer getFk_estacao() {
        return fk_estacao;
    }

    public void setFk_estacao(Integer fk_estacao) {
        this.fk_estacao = fk_estacao;
    }

    public Integer getFk_empresa() {
        return fk_empresa;
    }

    public void setFk_empresa(Integer fk_empresa) {
        this.fk_empresa = fk_empresa;
    }

    @Override
    public String toString() {
        return "Usuario{" + "id_agente=" + id_agente + ", login_agente=" + login_agente + ", senha_agente=" + senha_agente + ", fk_estacao=" + fk_estacao + ", fk_empresa=" + fk_empresa + '}';
    }

}
