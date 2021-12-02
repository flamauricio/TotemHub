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
public class Interagir {
    
    public String apresentar(){
        return String.format(
                "-------------------------------------------------------\n"
                + "Bem vindo ao controle de dados de máquinas Totemhub\n"
                + "-------------------------------------------------------"
        );
    }
}
