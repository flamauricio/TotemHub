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
            String status_processador,
            String status_memoria
    ) {
        super(
                cpu_totem_em_uso,
                memoria_em_uso,
                memoria_total,
                sistema_operacional,
                horario_totem,
                status_processador,
                status_memoria
        );
    }

    public Boolean inserirDadoBanco() {

        String sql
                = ("INSERT INTO historico_totem "
                + "(fk_totem, cpu_totem_em_uso, memoria_em_uso, memoria_total, sistema_operacional, horario_totem, status_processador, status_memoria) "
                + "VALUES (?, ?, ?, ?, ?, ?, ?)");

        con.update(
                sql,
                super.getCpu_totem_em_uso(),
                super.getMemoria_em_uso(),
                super.getMemoria_total(),
                super.getSistema_operacional(),
                super.getHorario_totem(),
                super.getStatus_processador(),
                super.getStatus_memoria()
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
        timer.schedule(t1, 5000, 150000);
    }

}
