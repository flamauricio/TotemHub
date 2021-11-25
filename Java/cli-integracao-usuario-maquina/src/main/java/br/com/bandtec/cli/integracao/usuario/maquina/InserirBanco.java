package br.com.bandtec.cli.integracao.usuario.maquina;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.util.List;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

/**
 *
 * @author jotal
 */
public class InserirBanco {
    
    private Integer id_historico;
    private Double cpu_totem_em_uso;
    private Double memoria_em_uso;
    private Double memoria_total;
    private String sistema_operacional;
    private String horario_totem;
    private String funcionamento_totem;
    private Integer fk_totem;

    public InserirBanco(Double cpu_totem_em_uso, Double memoria_em_uso, Double memoria_total, String sistema_operacional) {
       
        this.cpu_totem_em_uso = cpu_totem_em_uso;
        this.memoria_em_uso = memoria_em_uso;
        this.memoria_total = memoria_total;
        this.sistema_operacional = sistema_operacional;
       
    }
   
    
    
    conectaBD config = new conectaBD();
    JdbcTemplate con = new JdbcTemplate(config.getBancoDeDados());
    
    public Boolean inserirDado(
            
    ) {

        List<HistoricoTotem> insertDado = con.query(
                "INSERT INTO historico_totem "
                + "(cpu_totem_em_uso, memoria_em_uso, memoria_total, sistema_operacional) "
                + "VALUES"
                + "(?, ?, ?, ?)", 
                new BeanPropertyRowMapper(HistoricoTotem.class), 
                cpu_totem_em_uso,
                memoria_em_uso, 
                memoria_total, 
                sistema_operacional
        );
        
        return true;
        
    }
    
}
