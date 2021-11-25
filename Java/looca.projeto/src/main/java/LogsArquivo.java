/**
 *
 * @author jotal
 * @author Flavio
 */

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

public class LogsArquivo {

    public void gerarLog(String arquivo) {

        File file = new File("Relatório de serviço");
        File arquivoCriado = new File("Relatório de serviço/relatórios.txt");
        DateTimeFormatter formatar = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
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
            String frase = String.format(
                    "[%s] \t %s \n {\n"
                    + "\t%s \n"
                    + "\t%s \n"
                    + "\t%s \n"
                    + "\tTamanho do arquivo: %s \n"
                    + "\tCaminho do arquivo: %s \n"
                    + "\tCaminho absoluto do arquivo: %s \n"
                    + "\tDiretório pai: %s \n}",
                    formatar.format(LocalDateTime.now()),
                    arquivoCriado.getName(),
                    (arquivoCriado.isFile()
                    ? "É um arquivo" : "Não é arquivo"),
                    (arquivoCriado.isDirectory()
                    ? "É um diretório" : "Não é diretório"),
                    (arquivoCriado.isAbsolute()
                    ? "É um caminho de arquivo" : "Não é um caminho de arquivo"),
                    arquivoCriado.length(),
                    arquivoCriado.getPath(),
                    arquivoCriado.getAbsolutePath(),
                    arquivoCriado.getParent());

            escritorDeArquivo.write(frase);

            escritorDeTerminal.close();
            escritorDeArquivo.close();

            while (linhas != null) {
                System.out.println(linhas);
                linhas = leitorDeArquivo.readLine();
            }
        } catch (IOException ex) {

        }
    }
}
