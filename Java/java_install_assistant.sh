#!/bin/bash

PURPLE='0;35'
NC='\033[0m' 
VERSAO=11
	
	echo  "$(tput setaf 10)[botTotemHub]:$(tput setaf 7) Buenas, Buenas!!! Serei seu assistente para instalação do Java!;"
	echo "$(tput setaf 10)[botTotemHub]:$(tput setaf 7) Como você gostaria de ser chamado (a)?"
	read userName
	echo "$(tput setaf 10)[botTotemHub]:$(tput setaf 7) Olá,${userName}! Podemos iniciar? (S/N)" 
	read inicio
	if [ \"$inicio\" == \"n\" ]
	then
		echo "$(tput setaf 10)[botTotemHub]:$(tput setaf 7) Você optou por não iniciar o programa, até a próxima ${userName}!"
		exit
	fi
		echo "$(tput setaf 10)[botTotemHub]:$(tput setaf 7) Então bora lá, ${userName}..."
		echo ""
		echo "$(tput setaf 10)[botTotemHub]:$(tput setaf 7)  Você deseja atualizar suas dependências? (S/N)?"
		read mensage
	if [ \"$mensage\" == \"s\" ]
	then
		echo "$(tput setaf 10)[botTotemHub]:$(tput setaf 7) Entendido, irei atualizar agora para você!"
		sudo apt upgrade && sudo apt update
	fi		
		echo ""
		echo "$(tput setaf 10)[botTotemHub]:$(tput setaf 7)  Você optou por não atualizar suas dependências."
		echo ""
		echo "$(tput setaf 10)[botTotemHub]:$(tput setaf 7)  Agora, vamos começar verificar se sua máquina possui JAVA."

		echo  "$(tput setaf 10)[botTotemHub]:$(tput setaf 7)  Verificando..."
		echo -ne '\e[1;31m #####                     (33%)\r \e[0m'
		sleep 1
		echo -ne '\e[1;31m #############             (66%)\r \e[0m'
		sleep 1	
		echo -ne $(tput setaf 10)'#######################   (100%)\r'
		echo -ne '\n'
       
java -version
if [ $? -eq 0 ]
	then
		echo "$(tput setaf 10)[botTotemHub]:$(tput setaf 7) : Que bacana, você já possui o java instalado!"
		echo ""
		echo "Muito obrigado pela sua companhia, espero ter sido útil! valeu ${userName}!"
	else
		echo "$(tput setaf 10)[botTotemHub]:$(tput setaf 7)  Ops! Não encontrei nenhuma versão do Java instalado... "
		echo ""
		echo "$(tput setaf 10)[botTotemHub]:$(tput setaf 7) Fique tranquilo, posso resolver isso para você ${userName}!"
		echo ""
		echo "$(tput setaf 10)[botTotemHub]:$(tput setaf 7) ${userName}, confirme pra mim se você realmente deseja instalar o JAVA em sua máquina? (S/N)"
	read inst
	if [ \"$inst\" == \"s\" ]
		then
			echo "$(tput setaf 10)[botTotemHub]:$(tput setaf 7)  Ok! Você optou por instalar o Java ;D"
			echo ""
			echo "$(tput setaf 10)[botTotemHub]:$(tput setaf 7) 1° passo - Adicionar o repositório..."
			sleep 2
			sudo add-apt-repository ppa:webupd8team/java -y
			clear
			echo "$(tput setaf 10)[botTotemHub]:$(tput setaf 7)  Está Atualizando... Quase lá."
			sleep 2
			sudo apt update -y
			clear
			
			if [ $VERSAO -eq 11 ]
				then
					echo " 2° Preparando a instalação da versão 11 do Java. "
					echo ""
					echo "$(tput setaf 10)[botTotemHub]:$(tput setaf 7) ${userName} Quando for solicitado, Confirme a instalação por favor ;D"
					sudo apt install default-jre ; apt install openjdk-11-jre-headless; -y
					clear
					echo "$(tput setaf 10)[botTotemHub]:$(tput setaf 7) O Java instalado com sucesso!"
					echo ""
					echo "Muito obrigado pela sua companhia, espero ter sido útil! valeu ${userName}!"
				fi
		else 	
		echo "$(tput setaf 10)[botTotemHub]:$(tput setaf 7)  Você optou por não instalar o Java por enquanto, até a próxima ${userName}!"
	fi
fi

# ===================================================================
# Todos direitos reservados para o autor: Dra. Profa. Marise Miranda.
# Sob licença Creative Commons @2020
# Podera modificar e reproduzir para uso pessoal.
# Proibida a comercialização e a exclusão da autoria.
# ===================================================================
