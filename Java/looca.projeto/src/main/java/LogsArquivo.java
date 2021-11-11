
import java.io.File;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 *
 * @author jotal
 * @author Flavio
 */
public class LogsArquivo {
    
    public void gerarLog(String arquivo){
        File arquivoParaAnalisar = new File(arquivo);
        DateTimeFormatter formatar = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        
        if(arquivoParaAnalisar.exists()){
            
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
                    arquivoParaAnalisar.getName(),
                    (
                        arquivoParaAnalisar.isFile() ? 
                            "É um arquivo" : "Não é arquivo"
                    ),
                    (
                        arquivoParaAnalisar.isDirectory() ? 
                            "É um diretório" : "Não é diretório"
                    ),
                    (
                        arquivoParaAnalisar.isAbsolute() ? 
                            "É um caminho de arquivo" : "Não é um caminho de arquivo"
                    ),
                    arquivoParaAnalisar.length(),
                    arquivoParaAnalisar.getPath(),
                    arquivoParaAnalisar.getAbsolutePath(),
                    arquivoParaAnalisar.getParent()
            );
            System.out.println(frase);
            
            if(arquivoParaAnalisar.isDirectory()){
                String diretorio[] = arquivoParaAnalisar.list();
                System.out.println("Os diretórios contidos:");
                
                for(String diretorioNome : diretorio){
                    System.out.println("\t" + diretorioNome);
                }
            }
        } 
        else{
            System.out.println("Não existe");
        }
    }
}