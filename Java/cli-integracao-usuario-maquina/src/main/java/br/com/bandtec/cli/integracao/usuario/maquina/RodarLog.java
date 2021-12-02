/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.bandtec.cli.integracao.usuario.maquina;

/**
 *
 * @author jotal
 */
public class RodarLog {
    
     public static void main(String[] args) { 
         
        GerarLog arquivo = new GerarLog();
        
        arquivo.gerarLog("C:\\TotemHub\\Java\\cli-integracao-usuario-maquina");
        
    }

}
