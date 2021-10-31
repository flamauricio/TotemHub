package com.mycompany.login.agente;

import java.util.List;
import javax.swing.JOptionPane;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

public class Autenticar {

    private final String login;
    private final String senha;

    public Autenticar(String login, String senha) {
        this.login = login;
        this.senha = senha;

    }

    conectaBD config = new conectaBD();
    JdbcTemplate con = new JdbcTemplate(config.getBancoDeDados());

    public Boolean validar() {
        String loginUser = "";
        String senhaUser = "";
        List<Usuario> selectUser = con.query("SELECT * FROM agente_de_estacao WHERE"
                + " login_agente = ? AND senha_agente = ?", new BeanPropertyRowMapper(Usuario.class), login, senha);

        if (!selectUser.isEmpty()) {
            loginUser = selectUser.get(0).getLogin_agente();
            senhaUser = selectUser.get(0).getSenha_agente();

            if (loginUser.equals(login) && senhaUser.equals(senha)) {
                JOptionPane.showMessageDialog(null, "Login Realizado com sucesso");
                return true;
            } else {
                JOptionPane.showMessageDialog(null, "Login ERRADDOOOOO");
                return false;
            }
        }
        JOptionPane.showMessageDialog(null, "Login não cadastrado");

        return false;

    }
}
