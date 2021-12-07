package br.com.bandtec.cli.integracao.usuario.maquina;

import org.springframework.jdbc.core.JdbcTemplate;

public class BuscarDadosTotem extends Totem{

    protected conectaBD config = new conectaBD();
    protected JdbcTemplate con = new JdbcTemplate(config.getBancoDeDados());
    protected VisualizacaoMaquina tentarNovamente = new VisualizacaoMaquina();

    public BuscarDadosTotem(Integer id_totem) {
        super(id_totem);
    }
    
    public Boolean buscarId() {

        String sql = 
            (
                "SELECT id_totem FROM totem "
                + "WHERE id_totem = ?"
            );

        try
        {
            con.queryForMap(sql, super.getId_totem());
            return true;
            
        } catch(Exception exec){
            System.out.println("\nMáquina não cadastrada, tente novamente");
            this.tentarNovamente.visualizarMaquina();
            
        }
        
        return false;
        
    }
}