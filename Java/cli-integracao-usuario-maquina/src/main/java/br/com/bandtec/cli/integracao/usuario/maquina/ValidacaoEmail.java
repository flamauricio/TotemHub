/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.bandtec.cli.integracao.usuario.maquina;

import java.util.Scanner;

/**
 *
 * @author jotal
 */
public class ValidacaoEmail {
    
    protected Autenticar verif = new Autenticar();
    protected Scanner leitorUsuario = new Scanner(System.in);
    
    protected String loginUsuario;
    protected String senhaUsuario;
    
    public void validarEmail(){
        
        do{
            
            System.out.println("\nDigite seu email: ");
            this.loginUsuario = leitorUsuario.nextLine();

            System.out.println("Digite sua senha: ");
            this.senhaUsuario = leitorUsuario.nextLine();

            verif.validarCli(loginUsuario, senhaUsuario);

        }while(verif.validarCli(loginUsuario, senhaUsuario) == false);
        
    }
    
}
