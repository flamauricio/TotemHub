package br.com.bandtec.cli.integracao.usuario.maquina;

import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.memoria.Memoria;
import com.github.britooo.looca.api.group.processador.Processador;
import com.github.britooo.looca.api.group.sistema.Sistema;

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

        // objetos cli
        Autenticar verif = new Autenticar("", "");
        Conversor converter = new Conversor();

        InserirBanco inserir = new InserirBanco(
                converter.converterDadosProcessador(processador.getUso()),
                converter.converterDadosMemoriaEmUso(memoria.getEmUso().doubleValue()),
                converter.converterDadosMemoriaTotal(memoria.getTotal().doubleValue()),
                converter.converterDadosSistemaOperacional(sistema.getSistemaOperacional())
        );

        inserir.inserirDado();

        Scanner leitorUsuario = new Scanner(System.in);
        Scanner leitorOpcoes = new Scanner(System.in);
        Integer escolhaUsuario = 0;
        String senhaUsuario;
        String loginUsuario;

        System.out.println("-------------------------------------------------------\n"
                + "Bem vindo ao controle de dados de máquinas Totemhub\n"
                + "-------------------------------------------------------");

//        BACKUP:
//                converter.converterDadosProcessador(processador.getUso()),
//                converter.converterDadosMemoriaEmUso(memoria.getEmUso().doubleValue()),
//                converter.converterDadosMemoriaTotal(memoria.getTotal().doubleValue()),
//                converter.converterDadosSistemaOperacional(sistema.getSistemaOperacional())
        do {
            System.out.println("Digite seu email: ");
            loginUsuario = leitorUsuario.nextLine();

            System.out.println("Digite sua senha: ");
            senhaUsuario = leitorUsuario.nextLine();

        } while (verif.validarCli(loginUsuario, senhaUsuario) == false);

        do {
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
