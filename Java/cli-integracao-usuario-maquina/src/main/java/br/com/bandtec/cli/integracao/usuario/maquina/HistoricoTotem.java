/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.bandtec.cli.integracao.usuario.maquina;

/**
 *
 * @author jotal
 */
public class HistoricoTotem {
    
    private Integer id_historico;
    private Double cpu_totem_em_uso;
    private Double memoria_em_uso;
    private Double memoria_total;
    private String sistema_operacional;
    private String horario_totem;
    private String funcionamento_totem;
    private Integer fk_totem;

    public HistoricoTotem
        (
                Double cpu_totem_em_uso, 
                Double memoria_em_uso, 
                Double memoria_total,
                String sistema_operacional,
                String horario_totem, 
                String funcionamento_totem
        )
    {
        this.cpu_totem_em_uso = cpu_totem_em_uso;
        this.memoria_em_uso = memoria_em_uso;
        this.memoria_total = memoria_total;
        this.sistema_operacional = sistema_operacional;
        this.horario_totem = horario_totem;
        this.funcionamento_totem = funcionamento_totem;
    }
    
    public Integer getId_historico() {
        return id_historico;
    }

    public void setId_historico(Integer id_historico) {
        this.id_historico = id_historico;
    }

    public Double getCpu_totem_em_uso() {
        return cpu_totem_em_uso;
    }

    public void setCpu_totem_em_uso(Double cpu_totem_em_uso) {
        this.cpu_totem_em_uso = cpu_totem_em_uso;
    }

    public Double getMemoria_em_uso() {
        return memoria_em_uso;
    }

    public void setMemoria_em_uso(Double memoria_em_uso) {
        this.memoria_em_uso = memoria_em_uso;
    }
    
    public Double getMemoria_total() {
        return memoria_total;
    }

    public void setMemoria_total(Double memoria_total) {
        this.memoria_total = memoria_total;
    }

    public String getSistema_operacional() {
        return sistema_operacional;
    }

    public void setSistema_operacional(String sistema_operacional) {
        this.sistema_operacional = sistema_operacional;
    }

    public String getHorario_totem() {
        return horario_totem;
    }

    public void setHorario_totem(String horario_totem) {
        this.horario_totem = horario_totem;
    }

    public String getFuncionamento_totem() {
        return funcionamento_totem;
    }

    public void setFuncionamento_totem(String funcionamento_totem) {
        this.funcionamento_totem = funcionamento_totem;
    }

    public Integer getFk_totem() {
        return fk_totem;
    }

    public void setFk_totem(Integer fk_totem) {
        this.fk_totem = fk_totem;
    }
    
     @Override
    public String toString() {
        return "HistoricoTotem{" + "id_historico=" + id_historico + ", cpu_totem_em_uso=" + cpu_totem_em_uso + ", memoria_em_uso=" + memoria_em_uso + ", memoria_total=" + memoria_total + ", sistema_operacional=" + sistema_operacional + ", horario_totem=" + horario_totem + ", funcionamento_totem=" + funcionamento_totem + ", fk_totem=" + fk_totem + '}';
    }
    
}
