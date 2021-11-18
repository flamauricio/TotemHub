
package com.mycompany.login.agente.slack;

import java.io.IOException;
import org.json.JSONObject;

/**
 *
 * @author flavio <flavio.valerio@bandtec.com.br>
 */
public class App {
    public static void main(String[] args) throws IOException, InterruptedException {
        
        JSONObject json = new JSONObject();
        JSONObject jsonTeste = new JSONObject();
        JSONObject jsonAlert = new JSONObject();
        
        json.put("text", "Fácil :ghost:");
        jsonTeste.put("text","Teste em outra JsonObjetc Mandando via outro pacote:rocket:");
        jsonAlert.put("text", "A very important thing has occurred! <https://alert-system.com/alerts/1234|Click here> for details!");
        
        Slack.sendMessage(json);
        Slack.sendMessage(jsonTeste);
        Slack.sendMessage(jsonAlert);
    }
}
