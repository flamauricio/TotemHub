package br.com.bandtec.cli.integracao.usuario.maquina;

import java.util.Timer;
import java.util.TimerTask;
import org.springframework.jdbc.core.JdbcTemplate;

/**
 *
 * @author jotal
 */
public class InserirBanco extends HistoricoTotem {

    Timer timer;
    conectaBD config = new conectaBD();
    JdbcTemplate con = new JdbcTemplate(config.getBancoDeDados());
    GerarLog arquivo = new GerarLog();

    public InserirBanco(
            Double cpu_totem_em_uso,
            Double memoria_em_uso,
            Double memoria_total,
            String sistema_operacional,
            String horario_totem,
            String funcionamento_totem
    ) {
        super(
                cpu_totem_em_uso,
                memoria_em_uso,
                memoria_total,
                sistema_operacional,
                horario_totem,
                funcionamento_totem
        );
    }

    public Boolean inserirDadoBanco() {

        String sql
                = ("INSERT INTO historico_totem "
                + "(cpu_totem_em_uso, memoria_em_uso, memoria_total, sistema_operacional) "
                + "VALUES (?, ?, ?, ?)");

        con.update(
                sql,
                super.getCpu_totem_em_uso(),
                super.getMemoria_em_uso(),
                super.getMemoria_total(),
                super.getSistema_operacional()
        );

        return true;
    }

    public void inserirDado() {
        timer = new Timer();
        TimerTask t1 = new TimerTask() {
            @Override
            public void run() {
                arquivo.gerarLog("C:\\TotemHub\\Java\\cli-integracao-usuario-maquina");
                inserirDadoBanco();
            }
        ;
        }; 
        timer.schedule(t1, 15000, 15000);
    }

}
