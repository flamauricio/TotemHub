/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.bandtec.cli.integracao.usuario.maquina;

/**
 *
 * @author jotal
 */
public class Conversor {
    
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
