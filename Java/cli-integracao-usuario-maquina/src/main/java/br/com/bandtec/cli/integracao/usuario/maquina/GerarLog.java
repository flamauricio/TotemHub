package br.com.bandtec.cli.integracao.usuario.maquina;

// Bibliotecas para data e horário atual
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

// Bibliotecas para gerar log
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

// Bibliotecas para capturar dados de máquina através da api looca
import com.github.britooo.looca.api.group.memoria.Memoria;
import com.github.britooo.looca.api.group.processador.Processador;
import com.github.britooo.looca.api.group.sistema.Sistema;

/**
 *
 * @author jotal
 */
public class GerarLog {
    
    public void gerarLog(String arquivo) {

        File file = new File("Relatório de serviço");
        File arquivoCriado = new File("Relatório de serviço/relatórios.txt");
        DateTimeFormatter formatar = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");

        Memoria dadosMemoria = new Memoria();
        Processador dadosProcessador = new Processador();
        
        Sistema dadosSistema = new Sistema();
        Conversor conversor = new Conversor();
        Alertas alertas = new Alertas();
        
        try {
            
            file.mkdir();
            arquivoCriado.createNewFile();

            FileReader ler = new FileReader(arquivoCriado);
            BufferedReader leitorDeArquivo = new BufferedReader(ler);
            
//                                                                                             |-> NESTE CASO, O FALSE INDICA QUE TODA VEZ QUE 
//                                                                                             |    FOR ADICIONADO NOVO TEXTO NO ARQUIVO, 
//                                                                                             |    O ANTERIOR SERÁ DESFEITO, 
//                                                                                             |    O TRUE FAZ O CONTRÁRIO, OU SEJA, CONCATENA
//                                                                                             ------------|
            FileWriter escritorDeArquivo = new FileWriter(arquivoCriado, true);
            BufferedWriter escritorDeTerminal = new BufferedWriter(escritorDeArquivo);

            String linhas = leitorDeArquivo.readLine();
            
            Double dadoDoProcessador  = dadosProcessador.getUso();
            Double dadoMemoriaTotal = conversor.converter(dadosMemoria.getTotal().doubleValue());
            Double dadoMemoriaEmUso = conversor.converter(dadosMemoria.getEmUso().doubleValue());
            
            String frase = String.format(
                    "[%s] \t Funcionamento da máquina {\n\n"
                    + "\tIdentificação da máquina: %s \n"
                    + "\tSistema operacional: %s \n"
                    + "\tCPU utilizada: %.2f%% \n"
                    + "\t%s \n"
                    + "\tMemória total: %.2f GB\n"
                    + "\tMemória em uso: %.2f GB\n"
                    + "\t%s \n"
                    + "\tCaminho do arquivo: %s \n"
                    + "\tCaminho absoluto do arquivo: %s \n"
                    + "\t \n}\n\n",
                    formatar.format(LocalDateTime.now()),
                    dadosProcessador.getId(),
                    dadosSistema.getSistemaOperacional(),
                    dadoDoProcessador,
                    (
                        alertas.gerarAlerta(dadoDoProcessador)
                    ), 
                    dadoMemoriaTotal,
                    dadoMemoriaEmUso,
                    (
                        alertas.gerarAlerta(dadoMemoriaTotal, dadoMemoriaEmUso)
                    ),
                    arquivoCriado.getPath(),
                    arquivoCriado.getAbsolutePath()
            );

            escritorDeArquivo.write(frase);
            
            escritorDeTerminal.close();
            escritorDeArquivo.close();

            while (linhas != null) {
                linhas = leitorDeArquivo.readLine();
            }
            
        } catch (IOException ex) {
            System.out.println("Erro ao capturar dados de máquina");
        }
    }
    
}
