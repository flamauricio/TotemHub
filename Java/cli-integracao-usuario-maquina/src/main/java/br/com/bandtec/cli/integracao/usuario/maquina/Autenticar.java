package br.com.bandtec.cli.integracao.usuario.maquina;

import java.util.List;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

public class Autenticar {

    conectaBD config = new conectaBD();
    JdbcTemplate con = new JdbcTemplate(config.getBancoDeDados());

    public Boolean validarCli(String login, String senha) {
        List<Usuario> selectUser = con.query
        (
                "SELECT * FROM agente_de_estacao WHERE"
                + " login_agente = ? AND senha_agente = ?", 
                new BeanPropertyRowMapper(Usuario.class), 
                login, 
                senha
        );

        if (!selectUser.isEmpty()) {
            login = selectUser.get(0).getLogin_agente();
            senha = selectUser.get(0).getSenha_agente();

            if (login.equalsIgnoreCase(login) && senha.equals(senha)) {
                System.out.println("Login Realizado com sucesso");
                return true;
            } else {
                System.out.println("Login Errado");
                return false;
            }
        }
        System.out.println("Login não cadastrado");

        return false;

    }

}
