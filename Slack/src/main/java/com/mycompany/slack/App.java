
package com.mycompany.slack;

import java.io.IOException;
import org.json.JSONObject;

/**
 *
 * @author flavio <flavio.valerio@bandtec.com.br>
 */
public class App {
    public static void main(String[] args) throws IOException, InterruptedException {
        
        JSONObject json = new JSONObject();
        
        json.put("text", "Fácil né? :shrug:");
        
        Slack.sendMessage(json);
    }
}
