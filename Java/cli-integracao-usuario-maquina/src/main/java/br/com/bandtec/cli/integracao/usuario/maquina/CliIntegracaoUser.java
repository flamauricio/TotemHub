package br.com.bandtec.cli.integracao.usuario.maquina;

import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.memoria.Memoria;
import com.github.britooo.looca.api.group.processador.Processador;
import com.github.britooo.looca.api.group.sistema.Sistema;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

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
        
        // objeto data
        DateTimeFormatter formatar = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        
        // objetos cli
        Autenticar verif = new Autenticar();
        Conversor converter = new Conversor();
        
        // adicionando dados ao objeto de histórico
        Alertas alertas = new Alertas();
        
        // Inicializando a classe de inserir dados ao sql server com dados da superclasse
        InserirBanco inserir = new InserirBanco
        (
                processador.getId(),
                processador.getUso(),
                converter.converter(memoria.getEmUso().doubleValue()),
                converter.converter(memoria.getTotal().doubleValue()),
                sistema.getSistemaOperacional(),
                formatar.format(LocalDateTime.now()),
                alertas.gerarAlerta(converter.converter(memoria.getEmUso().doubleValue())),
                alertas.gerarAlerta(converter.converter(memoria.getTotal().doubleValue()))
        );
        
        // ínicio da interação com o usuário
        Interagir apresentar = new Interagir();
        
        // variáveis e ferramentas comuns
        Scanner leitorUsuario = new Scanner(System.in);
        Scanner leitorOpcoes = new Scanner(System.in);
        Integer escolhaUsuario;
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
