/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.bandtec.cli.integracao.usuario.maquina;

import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.memoria.Memoria;
import com.github.britooo.looca.api.group.processador.Processador;
import com.github.britooo.looca.api.group.sistema.Sistema;
import java.util.Date;

import java.util.Scanner;
    
/**
 *
 * @author jotal
 */
public class CliIntegracaoUser {
    
    public static void main(String[] args) {
        
        // objetos looca
        Looca looca = new Looca();
        Memoria memoria = new Memoria();
        Sistema sistema = new Sistema();
        Processador processador = new Processador();
        
        Date horarioAtual = new Date();
        
        // objetos cli
        Autenticar verif = new Autenticar();
        Conversor converter = new Conversor();
        
        // adicionando dados ao objeto de histórico
        HistoricoTotem dados = new HistoricoTotem
        (
                converter.converterDadosProcessador(processador.getUso().doubleValue()),
                converter.converterDadosMemoriaEmUso(memoria.getEmUso().doubleValue()),
                converter.converterDadosMemoriaTotal(memoria.getTotal().doubleValue()),
                converter.converterDadosSistemaOperacional(sistema.getSistemaOperacional()),
                horarioAtual.toString(),
                "1"
        );
        
        // Inicializando a classe de inserir dados ao sql server com dados da superclasse
        InserirBanco inserir = new InserirBanco
        (
                dados.getCpu_totem_em_uso(),
                dados.getMemoria_em_uso(),
                dados.getMemoria_total(),
                dados.getSistema_operacional(),
                horarioAtual.toString(),
                "1"
        );
        
        // ínicio da interação com o usuário
        Interagir apresentar = new Interagir();
        
        // variáveis e ferramentas comuns
        Scanner leitorUsuario = new Scanner(System.in);
        Scanner leitorOpcoes = new Scanner(System.in);
        Integer escolhaUsuario = 0;
        String senhaUsuario;
        String loginUsuario;
        
        apresentar.apresentar();
        
        do
        {
            System.out.println("Digite seu email: ");
            loginUsuario = leitorUsuario.nextLine();

            System.out.println("Digite sua senha: ");
            senhaUsuario = leitorUsuario.nextLine();
            
        } while(verif.validarCli(loginUsuario, senhaUsuario) == false);
        
        do
        {
            // Inserindo dados ao banco depois do login ser realizado
            inserir.inserirDado();
            
            System.out.println("\n"
                    + "Selecione a opção relativa ao dado desejado: \n"
                    + "[1] - CPU \n"
                    + "[2] - Sistema Operacional \n"
                    + "[3] - Memória \n"
                    + "[0] -> Sair"
            );

            escolhaUsuario = leitorOpcoes.nextInt();

            switch (escolhaUsuario) {
                case 1:
                    System.out.println(looca.getProcessador());
                    break;
                case 2:
                    System.out.println(looca.getSistema());
                    break;
                case 3:
                    System.out.println(looca.getMemoria());
                    break;
                case 0:
                    System.out.println("Logout");
                    break;
                default:
                    System.out.println("Numero incorreto, tente novamente");
                    break;
            }
            
        } while (escolhaUsuario != 0);

    }
}
