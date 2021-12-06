package br.com.bandtec.cli.integracao.usuario.maquina;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Timer;
import java.util.TimerTask;
import org.springframework.jdbc.core.JdbcTemplate;

/**
 *
 * @author jotal
 */
public class InserirBanco extends HistoricoTotem {

    protected Timer timer;
    protected conectaBD config = new conectaBD();
    protected JdbcTemplate con = new JdbcTemplate(config.getBancoDeDados());
    protected GerarLog arquivo = new GerarLog();
    

    public InserirBanco(
            Integer fk_totem,
            Double cpu_totem_em_uso,
            Double memoria_em_uso,
            Double memoria_total,
            String sistema_operacional,
            String status_processador,
            String status_memoria
    ) {
        super(
                fk_totem,
                cpu_totem_em_uso,
                memoria_em_uso,
                memoria_total,
                sistema_operacional,
                status_processador,
                status_memoria
        );
    }

    public Boolean inserirDadoBanco() {

        DateTimeFormatter formatar = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");

        String horarioAtual = formatar.format(LocalDateTime.now());
        
        String sql
                = ("INSERT INTO historico_totem "
                + "(fk_totem,cpu_totem_em_uso, memoria_em_uso, memoria_total, "
                + "sistema_operacional, status_processador, status_memoria, horario_totem) "
                + "VALUES (?, ?, ?, ?, ?, ?, ?, ?)");

        con.update(
                sql,
                super.getFk_totem(),
                super.getCpu_totem_em_uso(),
                super.getMemoria_em_uso(),
                super.getMemoria_total(),
                super.getSistema_operacional(),
                super.getStatus_processador(),
                super.getStatus_memoria(),
                horarioAtual
        );

        return true;
    }

    public void inserirDado() {
        this.timer = new Timer();
        TimerTask t1 = new TimerTask() {
            @Override
            public void run() {
                arquivo.gerarLog("C:\\TotemHub\\Java\\cli-integracao-usuario-maquina");
                inserirDadoBanco();
            };
        }; 
        this.timer.schedule(t1, 2000, 150000);
    }
    
}
