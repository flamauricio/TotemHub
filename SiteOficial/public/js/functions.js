
function obterPublicacoes(idGerente) {
    // aguardar();
    alert("teste")
    var idGerente = sessionStorage.id_usuario_meuapp;

    fetch(`/usuarios/${idGerente}`)
    
        .then(resposta => {
            
            if (resposta.ok) {
                
                resposta.json().then(function (resposta) {
                    atualizarFeed(resposta);
                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    
                    alert("aqui tem outro teste")
                    
                    // alert('obterPublicacoes')
                    // finalizarAguardar();
                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
                alert('nao foi aqui')

                // finalizarAguardar("Nenhum resultado encontrado ou erro na API");

            }
        })
        .catch(function (error) {
            alert("aviso")
            console.error(`Erro na obtenção das publicações: ${error.message}`);
        });
}

function atualizarFeed(usuarios) {
    var feedId = document.getElementById("feed_id");
    var feedLogin = document.getElementById("feed_login");
    var feed = document.getElementById("feed_container");
    var feedEstacao = document.getElementById("feed_estacao");
  
    for (let contador = 0; contador < usuarios.length; contador++) {
        var usuario = usuarios[contador];
        
        var divConsulta = document.createElement("div")
        var divConsulta2 = document.createElement("div")
        var divConsulta3 = document.createElement("div")
        var divConsulta4 = document.createElement("div")

        var divNome = document.createElement("div")
        var divEndereco = document.createElement("div");
        var divEstacao = document.createElement("div");
        var divId = document.createElement("div");


        divNome.innerHTML = `${usuario.nome_agente}`;
        divConsulta.appendChild(divNome);

        divEndereco.innerHTML = `${usuario.login_agente}`;
        divConsulta2.appendChild(divEndereco);

        

        divEstacao.innerHTML = `${usuario.fk_estacao}`;
        if(usuario.fk_estacao == "100"){
            divEstacao.innerHTML = "Consolação";
        } else if(usuario.fk_estacao == "101"){
            divEstacao.innerHTML = "Pinheiros";
        } else if(usuario.fk_estacao == "102"){
            divEstacao.innerHTML = "República";
        }
        divConsulta3.appendChild(divEstacao);
        

        divId.innerHTML = `${usuario.id}`;
        divConsulta4.appendChild(divId);
    
        feed.appendChild(divConsulta);
        feedLogin.appendChild(divConsulta2);
        feedEstacao.appendChild(divConsulta3);
        feedId.appendChild(divConsulta4);

    }
}