// Funções 
function loginEmp(){
    var user = cnpj.value;
    var senha = senhaEmp.value;
            if (user== "" || senha == "") {
                alert("informar corretamente CNPJ e/ou senha!");
                setTimeout (300);
            }
            else{
                window.location.href ="pagina_cadastro_gerente.html";
            }
}

// Funções da dash
function voltar() {
    window.location.href = 'index.html';
}

// Nossos rótulos para o eixo X
var tempo_funcionamento = ["1h","2h","3h","4h","5h","6h","7h","8h"];

// Para desenhar as linhas
    const totem1 = [22,63,35,50,48,72,77,11];
    const totem2 = [10,76,98,3,45,91,22,75];
    const totem3 = [21,41,8,85,30,11,29,41];
    const totem4 = [66,98,27,2,89,71,20,25];