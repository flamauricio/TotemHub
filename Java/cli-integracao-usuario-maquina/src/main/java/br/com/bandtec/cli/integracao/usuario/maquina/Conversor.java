package br.com.bandtec.cli.integracao.usuario.maquina;

public class Conversor {
    
    public Double converter(Double valor){
        
        return valor * 0.000000001;
    }
    
    public Double converterDadosProcessador(Double dado){
        return dado / 100000;
        
    }
    
    public Double converterDadosMemoriaEmUso(Double dado){
        return dado / 100000;
        
    }
    
    public Double converterDadosMemoriaTotal(Double dado){
        return dado / 100000;
        
    }
    
    public String converterDadosSistemaOperacional(String dado){
        return dado;
    }
    
}
