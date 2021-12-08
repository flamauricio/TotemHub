package br.com.bandtec.cli.integracao.usuario.maquina;

public class CliIntegracaoUser {
    
    public static void main(String[] args) {        
         
        // Objetos CLI
        ValidacaoEmail validar = new ValidacaoEmail();
        Interagir apresentar = new Interagir();
        InsercaoDadosMaquina inserirDadosMaquina = new InsercaoDadosMaquina();
        
        // Ínicio CLI
        apresentar.apresentar();
        validar.validarEmail();
        inserirDadosMaquina.inserirDadosDeMaquina();

    }
    
}
