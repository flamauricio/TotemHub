package br.com.bandtec.cli.integracao.usuario.maquina;

public class Alertas {
    
    public String gerarAlerta(Double dado){
        String alerta;
        if(dado <= 20){
            alerta = "Máquina estável, baixo uso de processador";
        } else if(dado <= 50){
            alerta = "Máquina estável, utilização moderada de processador";
        } else if(dado <= 80){
            alerta = "Máquina instável, utilização de processador acima do esperado";
        } else {
            alerta = "Máquina crítica, utilização de processador crítica";
        }
        return alerta;
    }
    
    public String gerarAlerta(Double dadoMemoriaTotal, Double dadoMemoriaEmUso){
        
//        dadoMemoriaTotal = dadoMemoriaTotal * 0.1;
//        dadoMemoriaEmUso = dadoMemoriaEmUso * 0.1;
        
        Double resultado =  100 - ((dadoMemoriaEmUso * 100) / dadoMemoriaTotal);

        String alerta;
        if(resultado <= 20){
            alerta = String.format
            (
                    "Porcentagem de memória restante: %.2f%% \n"
                    + "\tMáquina instável, utilização de memória crítica",
                    resultado
            );
            
        } else if(resultado <= 50){
            alerta = String.format
            (
                    "Porcentagem de memória restante: %.2f%% \n"
                    + "\tMáquina instável, utilização de memória acima do esperado",
                    resultado
            );
            
        } else if(resultado <= 80){
            alerta = String.format
            (
                    "Porcentagem de memória restante: %.2f%% \n"
                    + "\tMáquina estável, utilização moderada de memória",
                    resultado
            );
            
        } else {
            alerta = String.format
            (
                    "Porcentagem de memória restante: %.2f%% \n"
                    + "\tMáquina estável, baixo uso de memória",
                    resultado
            );
        }
        return alerta;
    }
    
}
