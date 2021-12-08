package br.com.bandtec.cli.integracao.usuario.maquina;

public class Sessao {
    
    protected ValidacaoEmail novaSessao = new ValidacaoEmail();
    
    public void encerrarSessao(){
        novaSessao.validarEmail();
    }
    
}
