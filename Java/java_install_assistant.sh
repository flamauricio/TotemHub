#!/bin/bash

PURPLE='0;35'
NC='\033[0m' 
VERSAO=11
	
	echo  "$(tput setaf 10)[botTotemHub]:$(tput setaf 7) Buenas, Buenas!!! Serei seu assistente para instalação do Java!;"
	echo "$(tput setaf 10)[botTotemHub]:$(tput setaf 7) Qual seu nome?"
	read userName
	echo "$(tput setaf 10)[botTotemHub]:$(tput setaf 7) Olá,${userName}! Podemos iniciar? (S/N)" 
	read inicio
	if [ \"$inicio\" == \"s\" ]
	then
	echo "$(tput setaf 10)[botTotemHub]:$(tput setaf 7) Então bora lá ${userName}..."
	echo ""
	fi
	echo "$(tput setaf 10)[botTotemHub]:$(tput setaf 7)  Você deseja atualizar suas dependências? (S/N)?"
	read mensage
	if [ \"$mensage\" == \"s\" ]
	then
		echo "$(tput setaf 10)[botTotemHub]:$(tput setaf 7) Entendi, irei atualizar agora para você!"
		sudo apt upgrade && sudo apt update
	fi		
		echo ""
		echo "$(tput setaf 10)[botTotemHub]:$(tput setaf 7)  Você optou por não atualizar suas dependências."
		echo ""
		echo "$(tput setaf 10)[botTotemHub]:$(tput setaf 7)  Agora, iremos começar a verificar o seu JAVA."

		echo  "$(tput setaf 10)[botTotemHub]:$(tput setaf 7)  Verificando..."
		echo -ne $(tput setaf 10)'#####                     (33%)\r'
		sleep 1
		echo -ne $(tput setaf 10)'#############             (66%)\r'
		sleep 1	
		echo -ne $(tput setaf 10)'#######################   (100%)\r'
		echo -ne '\n'

java -version
if [ $? -eq 0 ]
	then
		echo "$(tput setaf 10)[botTotemHub]:$(tput setaf 7) : Olá você já tem o java instalado!!"
	else
		echo "$(tput setaf 10)[botTotemHub]:$(tput setaf 7)  Opa! Não identifiquei nenhuma versão do Java instalado, mas sem problemas, irei resolver isso agora!"
		echo "$(tput setaf 10)[botTotemHub]:$(tput setaf 7)  Confirme para mim se realmente deseja instalar o Java (S/N)?"
	read inst
	if [ \"$inst\" == \"s\" ]
		then
			echo "$(tput setaf 10)[botTotemHub]:$(tput setaf 7)  Ok! Você escolheu instalar o Java ;D"
			echo "$(tput setaf 10)[botTotemHub]:$(tput setaf 7)  Adicionando o repositório!"
			sleep 2
			sudo add-apt-repository ppa:webupd8team/java -y
			clear
			echo "$(tput setaf 10)[botTotemHub]:$(tput setaf 7)  Atualizando! Quase lá."
			sleep 2
			sudo apt update -y
			clear
			
			if [ $VERSAO -eq 11 ]
				then
					echo "$(tput setaf 10)[botTotemHub]:$(tput setaf 7) Preparando para instalar a versão 11 do Java. Confirme a instalação quando solicitado ;D"
					sudo apt install default-jre ; apt install openjdk-11-jre-headless; -y
					clear
					echo "$(tput setaf 10)[botTotemHub]:$(tput setaf 7) Java instalado com sucesso!"
				fi
		else 	
		echo "$(tput setaf 10)[botTotemHub]:$(tput setaf 7)  Você optou por não instalar o Java por enquanto, até a próxima então!"
	fi
fi

# ===================================================================
# Todos direitos reservados para o autor: Dra. Profa. Marise Miranda.
# Sob licença Creative Commons @2020
# Podera modificar e reproduzir para uso pessoal.
# Proibida a comercialização e a exclusão da autoria.
# ===================================================================
