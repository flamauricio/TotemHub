/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.bandtec.cli.integracao.usuario.maquina;

import java.util.Scanner;

/**
 *
 * @author jotal
 */
public class VisualizacaoMaquina {
    
    protected Scanner leitorOpcoes = new Scanner(System.in);
    protected Integer escolha;
    
    protected Totem totem;
    protected BuscarDadosTotem buscarIdNoBanco;

    public Boolean visualizarMaquina(){
        
        do
        {
            System.out.println("\nSelecione o ID da máquina do qual você deseja visualizar:");
            this.escolha = leitorOpcoes.nextInt();
            
            // Vai iniciar minha super classe com o id da máquina desejada
            this.totem = new Totem(escolha);
            
            // Buscando o id da minha máquina no banco de dados
            buscarIdNoBanco = new BuscarDadosTotem(escolha);
            
            return buscarIdNoBanco.buscarId();
            
        } while(buscarIdNoBanco.buscarId() == false);
        
    }
    
}
