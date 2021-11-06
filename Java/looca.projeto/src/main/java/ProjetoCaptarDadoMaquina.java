
import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.sistema.Sistema;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author jotal
 */
public class ProjetoCaptarDadoMaquina {
   
    public static void main(String[] args) { 
        Looca looca = new Looca();
        Sistema sistema = looca.getSistema();
       
        System.out.println(looca.getMemoria());
    }
    
}
