// Funções 
function cadastrar(){
    var nomePessoa = nome.value;
    var estacao = linha.value;
    var user = usuario.value;
    var senhaUser = senha.value;
            if (nomePessoa == "") {
                alert("Favor informar o seu nome!");
                setTimeout (300);
            }
            else if(estacao == ""){
                alert("Favor informar a linha de trabalho!");
            }
            else if(user == "" || senhaUser == ""){
                alert("Usuario ou senha incorretas!");
            }
            else{
                window.location.href ="login.html";
            }
}