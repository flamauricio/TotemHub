package br.com.bandtec.cli.integracao.usuario.maquina;

import java.util.Scanner;

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
