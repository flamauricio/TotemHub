    let proximaAtualizacaoU;
    let proximaAtualizacaoT;
    

    window.onload = obterDadosGraficoPrimeiraVez(1);

    let usuario;
 
    
    verificar_autenticacao();


    // function alterarCoresBotoes(id_leitura) {
    //     console.log("executei alterarCoresBotoes")
    //     botaoCaminhao1.className = "btn"
    //     botaoCaminhao2.className = "btn"
    //     botaoCaminhao3.className = "btn"
    //     botaoCaminhao4.className = "btn"

    //     if (id_leitura == "1") {
    //         botaoCaminhao1.className += " btn-now"
    //     } else if (id_leitura == "2") {
    //         botaoCaminhao2.className += " btn-now"
    //     } else if (id_leitura == "3") {
    //         botaoCaminhao3.className += " btn-now"
    //     } else if (id_leitura == "4") {
    //         botaoCaminhao4.className += " btn-now"
    //     }
    // }

    function chamargraficos(id_leitura) {
        console.log("executei chamargraficos")
        obterDadosGraficoPrimeiraVez(id_leitura)
        //atualizarGrafico(id_leitura)

        // alterarCoresBotoes(id_leitura);

    }

    
    // neste JSON tem que ser 'labels', 'datasets' etc, 
    // porque é o padrão do Chart.js



    // altere aqui as configurações do gráfico
    // (tamanhos, cores, textos, etc)
    function configurarGraficoT() {
        console.log("executei configurarGrafico")
        var configuracoesT = {
            responsive: true,
            animation: { duration: 500 },
            hoverMode: 'index',
            stacked: false,
            title: {
                display: true,
                text: 'Histórico recente da Temperatura'
            },
            scales: {
                yAxes: [{
                    type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                    display: true,
                    position: 'left',
                    id: 'y-temperatura',
                }],
            }
        };

        return configuracoesT;
    }

    function configurarGraficoU() {
        console.log("executei configurarGrafico")
        var configuracoesU = {
            responsive: true,
            animation: { duration: 500 },
            hoverMode: 'index',
            stacked: false,
            title: {
                display: true,
                text: 'Histórico recente da Umidade'
            },
            scales: {
                yAxes: [{
                    type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                    display: true,
                    position: 'left',
                    id: 'y-umidade',

                    // grid line settings
                    gridLines: {
                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                    },
                }],
            }
        };

        return configuracoesU;
    }


    // altere aqui como os dados serão exibidos
    // e como são recuperados do BackEnd
    function obterDadosGraficoPrimeiraVez(id_leitura) {
        console.log("executei obterDadosGraficoPrimeiraVez")
        // alterarCoresBotoes(id_leitura);

        if (proximaAtualizacaoU != undefined || proximaAtualizacaoT != undefined) {
            clearTimeout(proximaAtualizacaoU);
            clearTimeout(proximaAtualizacaoT);
        }

        fetch(`/leituras/ultimas/${id_leitura}`, { cache: 'no-store' }).then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    resposta.reverse();

                    console.log(resposta.temperatura); // retorna undefined
                    console.log(resposta); // retorna [array(7), array(7)]
                    

                    var dadosT = {
                        labels: [],
                        datasets: [
                            {
                                yAxisID: 'y-temperatura',
                                label: 'Temperatura',
                                borderColor: 'rgba(255,0,0,1)',
                                backgroundColor: 'rgba(255,0,0,1)',
                                fill: false,
                                data: []
                            }

                        ]
                    };

                    var dadosU = {
                        labels: [],
                        datasets: [
                            {
                                yAxisID: 'y-umidade',
                                label: 'Umidade',
                                borderColor: 'rgba(51, 102, 255,1)',
                                backgroundColor: 'rgba(51, 102, 255,1)',
                                fill: false,
                                data: []
                            }
                        ]
                    };
                    


                    for (i = 0; i < resposta.length; i++) {
                        var registro = resposta[i];

                        dadosT.labels.push(resposta.momento_grafico);
                        dadosT.datasets[0].data.push(registro.temperatura);

                        dadosU.labels.push(registro.momento_grafico);
                        dadosU.datasets[0].data.push(registro.umidade);
                        

                    }
                    console.log(JSON.stringify(dadosT));
                    console.log(JSON.stringify(dadosU));
                    console.log('CHEGOU AQUI');

                    plotarGraficoT(dadosT, id_leitura);
                    plotarGraficoU(dadosU, id_leitura);
                    div_msg.innerHTML = `<h2> Grafico da Estufa: ${id_leitura} </h2>`;
                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
            .catch(function (error) {
                console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
            });

    }

    // só mexer se quiser alterar o tempo de atualização
    // ou se souber o que está fazendo!

    function atualizarGraficoT(id_leitura, dadosT) {
        console.log("executei atualizarGraficoT")
        fetch(`/leituras/cliente/${id_leitura}`, { cache: 'no-store' }).then(function (response) {
            console.log("Estou tentando pegar id_leitura da Temperatura= ", id_leitura)
            if (response.ok) {
                response.json().then(function (novoRegistro) {

                    console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                    console.log(`Dados atuais do gráfico: ${dadosT}`);

                    // tirando e colocando valores no gráfico
                    dadosT.labels.shift(); // apagar o primeiro
                    dadosT.labels.push(novoRegistro.momento_grafico); // incluir um novo momento
                    dadosT.datasets[0].data.shift();  // apagar o primeiro de temperatura
                    dadosT.datasets[0].data.push(novoRegistro.temperatura); // incluir uma nova leitura de temperatura


                    console.log("meu caminhão é o " + id_leitura)

                    window.grafico_linhaT.update();


                    proximaAtualizacaoT = setTimeout(() => atualizarGraficoT(id_leitura, dadosT), 5000);
                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
                proximaAtualizacaoT = setTimeout(() => atualizarGraficoT(id_leitura, dadosT), 5000);
            }
        })
            .catch(function (error) {
                console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
            });

     }

    function atualizarGraficoU(id_leitura, dadosU) {
        console.log("executei atualizarGrafico")
        fetch(`/leituras/ultimas/${id_leitura}`, { cache: 'no-store' }).then(function (response) {
            console.log("Estou tentando pegar id_leitura da Umidade = ", id_leitura)
            if (response.ok) {
                response.json().then(function (novoRegistro) {

                    console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                    console.log(`Dados atuais do gráfico: ${dadosU}`);

                    // tirando e colocando valores no gráfico
                    dadosU.labels.shift(); // apagar o primeiro
                    dadosU.labels.push(novoRegistro.momento_grafico); // incluir um novo momento
                    dadosU.datasets[0].data.shift();  // apagar o primeiro de umidade
                    dadosU.datasets[0].data.push(novoRegistro.umidade); // incluir uma nova leitura de umidade

                    console.log("meu caminhão é o " + id_leitura)

                    window.grafico_linhaU.update();


                    proximaAtualizacaoU = setTimeout(() => atualizarGraficoU(id_leitura, dadosU), 5000);
                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
                proximaAtualizacaoU = setTimeout(() => atualizarGraficoU(id_leitura, dadosU), 5000);
            }
        })
            .catch(function (error) {
                console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
            });

    }

    // só altere aqui se souber o que está fazendo!
    function plotarGraficoT(dadosT, id_leitura) {
        console.log("executei plotarGrafico")
        console.log('iniciando plotagem do gráfico...');

        var ctx = myChartArea.getContext('2d');
        window.grafico_linhaT = Chart.Line(ctx, {
            data: dadosT,
            options: configurarGraficoT()
        });

        setTimeout(() => atualizarGraficoT(id_leitura, dadosT), 5000);
    }

    function plotarGraficoU(dadosU, id_leitura) {
        console.log("executei plotarGrafico")
        console.log('iniciando plotagem do gráfico...');

        var ctx = myPieChart.getContext('2d');
        window.grafico_linhaU = Chart.Line(ctx, {
            data: dadosU,
            options: configurarGraficoU()
        });

        setTimeout(() => atualizarGraficoU(id_leitura, dadosU), 5000);
    }


    // Alertas



    function sendData() {
        var http = new XMLHttpRequest();
        http.open('GET', 'http://localhost:9001/api/sendData', false);
        http.send(null);
    }

    // Descomente abaixo se quiser inserir dados a cada X segundos
    setInterval(() => {
        sendData();
    }, 5000);

