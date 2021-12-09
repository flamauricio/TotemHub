package br.com.bandtec.cli.integracao.usuario.maquina;

import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.memoria.Memoria;
import com.github.britooo.looca.api.group.processador.Processador;
import com.github.britooo.looca.api.group.sistema.Sistema;

public class InsercaoDadosMaquina extends VisualizacaoMaquina{
    
     // objeto data
        
    protected InserirBanco inserir;
    protected Integer escolhaUsuario;
    
    // objetos looca
    protected Looca looca = new Looca();
    protected Memoria memoria = new Memoria();
    protected Sistema sistema = new Sistema();
    protected Processador processador = new Processador();
    
    protected Conversor converter = new Conversor();
    
    protected Alertas alertas = new Alertas();
    
    protected Sessao sessao = new Sessao();
    
    public void inserirDadosDeMaquina(){
        
        super.visualizarMaquina();
        
        do
        {
            // Inicializando a classe de inserir dados ao sql server com dados da superclasse
            this.inserir = new InserirBanco(
                    super.totem.getId_totem(),
                    this.processador.getUso(),
                    this.converter.converter(memoria.getEmUso().doubleValue()),
                    this.converter.converter(memoria.getTotal().doubleValue()),
                    this.sistema.getSistemaOperacional(),
                    this.alertas.gerarAlerta(converter.converter(memoria.getEmUso().doubleValue())),
                    this.alertas.gerarAlerta(converter.converter(memoria.getTotal().doubleValue()))
            );
            
            this.inserir.inserirDado();
            
            System.out.println("\n"
                    + "Selecione a opção relativa ao dado desejado: \n"
                    + "[1] - CPU \n"
                    + "[2] - Sistema Operacional \n"
                    + "[3] - Memória \n"
                    + "[4] -> Nova visualização \n"
                    + "[0] -> Encerrar aplicação"
            );

            this.escolhaUsuario = leitorOpcoes.nextInt();

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
                    System.out.println("Encerrando sessão");
                    sessao.encerrarSessao();
                    break;
                default:
                    System.out.println("Selecione algum valor válido");
                    break;
            }
            
        } while (escolhaUsuario != 0 && escolhaUsuario != 4);
        
        if(escolhaUsuario == 4){
                System.out.println("Carregando nova visualização");
                InsercaoDadosMaquina novaEscolha = new InsercaoDadosMaquina();
                novaEscolha.inserirDadosDeMaquina();
                
        }

    }
    
}
