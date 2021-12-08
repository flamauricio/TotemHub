package br.com.bandtec.cli.integracao.usuario.maquina;

public class Totem {
    
    private Integer id_totem;
    private Integer fk_estacao;

    public Totem(Integer id_totem){
        this.id_totem = id_totem;
    }

    public Integer getId_totem() {
        return id_totem;
    }

    public void setId_totem(Integer id_totem) {
        this.id_totem = id_totem;
    }

    public Integer getFk_estacao() {
        return fk_estacao;
    }

    public void setFk_estacao(Integer fk_estacao) {
        this.fk_estacao = fk_estacao;
    }

    @Override
    public String toString() {
        return "Totem{" + "id_totem=" + id_totem + ", fk_estacao=" + fk_estacao + '}';
    }
    
}
