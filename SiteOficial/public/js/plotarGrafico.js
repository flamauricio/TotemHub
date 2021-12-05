let proximaAtualizacaoC;
let proximaAtualizacaoM;


window.onload = obterDadosGraficoPrimeiraVez('BFEBFBFF000806EC');

let usuario;

// verificar_autenticacao();

/*
function alterarCoresBotoes(id_leitura) {
  console.log("executei alterarCoresBotoes");
  botaoCaminhao1.className = "btn";
  botaoCaminhao2.className = "btn";
  botaoCaminhao3.className = "btn";
  botaoCaminhao4.className = "btn";

  if (id_leitura == "1") {
    botaoCaminhao1.className += " btn-now";
  } else if (id_leitura == "2") {
    botaoCaminhao2.className += " btn-now";
  } else if (id_leitura == "3") {
    botaoCaminhao3.className += " btn-now";
  } else if (id_leitura == "4") {
    botaoCaminhao4.className += " btn-now";
  }
}
*/

function chamargraficos(id_historico) {
  console.log("executei chamar graficos");
    obterDadosGraficoPrimeiraVez(id_historico);
    atualizarGraficoC(id_historico);
    atualizarGraficoM(id_historico);
    // alterarCoresBotoes(id_leitura);    
}

 // neste JSON tem que ser 'labels', 'datasets' etc, porque é o padrão do Chart.js

// altere aqui as configurações do gráfico(tamanhos, cores, textos, etc)
function configurarGraficoC() {
  console.log("executei configurarGraficoC");
  var configuracoesC = {
    responsive: true,
    animation: { duration: 500 },
    hoverMode: "index",
    stacked: false,
    title: {
      display: true,
      text: "Histórico recente da CPU",
    },
    scales: {
      yAxes: [
        {
          type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
          display: true,
          position: "left",
          id: "y-CPU",
        },
      ],
    },
  };

  return configuracoesC;
}

function configurarGraficoM() {
  console.log("executei configurarGraficoM");
  var configuracoesM = {
    responsive: true,
    animation: { duration: 500 },
    hoverMode: "index",
    stacked: false,
    title: {
      display: true,
      text: "Histórico recente da Memoria",
    },
    scales: {
      yAxes: [
        {
          type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
          display: true,
          position: "left",
          id: "y-Memoria",

          // grid line settings
          gridLines: {
            drawOnChartArea: false, // only want the grid lines for one axis to show up
          },
        },
      ],
    },
  };

  return configuracoesM;
}

// altere aqui como os dados serão exibidos
// e como são recuperados do BackEnd
function obterDadosGraficoPrimeiraVez(id_historico) {
  console.log("executei obterDadosGraficoPrimeiraVez");
  // alterarCoresBotoes(id_leitura);

  if (proximaAtualizacaoC != undefined || proximaAtualizacaoM != undefined) {
    clearTimeout(proximaAtualizacaoC);
    clearTimeout(proximaAtualizacaoM);
  }

  fetch(`/leituras/ultimas/${id_historico}`)
    .then(function (response) {
     
      if (response.ok) {
        response.json().then(function (resposta) {
          console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
          resposta.reverse();

         
          console.log(resposta.cpu_totem_em_uso); // retorna undefined
          console.log(resposta.memoria_em_uso);
          console.log(resposta); // retorna [array(7), array(7)]

          var dadosC = {
            labels: [],
            datasets: [
              {
                yAxisID: "y-CPU",
                label: "CPU",
                borderColor: "rgba(255,0,0,1)",
                backgroundColor: "rgba(255,0,0,1)",
                fill: false,
                data: [],
              },
            ],
          };

          var dadosM = {
            labels: [],
            datasets: [
              {
                yAxisID: "y-Memoria",
                label: "Memoria",
                borderColor: "rgba(51, 102, 255,1)",
                backgroundColor: "rgba(51, 102, 255,1)",
                fill: false,
                data: [],
              },
            ],
          };

          for (i = 0; i < resposta.length; i++) {
            var registro = resposta[i];

            dadosM.labels.push(registro.momento_grafico);
            dadosM.datasets[0].data.push(registro.memoria_em_uso);

            dadosC.labels.push(registro.momento_grafico);
            dadosC.datasets[0].data.push(registro.cpu_totem_em_uso);
          }
          console.log(JSON.stringify(dadosC));
          console.log(JSON.stringify(dadosM));
          console.log("CHEGOU AQUI");

          plotarGraficoC(dadosC, id_historico);
          plotarGraficoM(dadosM, id_historico);
          div_msg.innerHTML = `<h2> Grafico dos totem: ${id_historico} </h2>`;
        });
      } else {
        console.error("Nenhum dado encontrado ou erro na API");
      }
    })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

// só mexer se quiser alterar o tempo de atualização
// ou se souber o que está fazendo!

function atualizarGraficoC(id_historico, dadosC) {
  console.log("executei atualizarGraficoC");
  fetch(`/leituras/cliente/${id_historico}`, { cache: "no-store" })
    .then(function (response) {
      console.log(
        "Estou tentando pegar id_leitura da CPU= ", id_historico);
      if (response.ok) {
        response.json().then(function (novoRegistro) {
          console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
          console.log(`Dados atuais do gráfico: ${dadosC}`);

          // tirando e colocando valores no gráfico
          dadosC.labels.shift(); // apagar o primeiro
          dadosC.labels.push(novoRegistro.momento_grafico); // incluir um novo momento
          dadosC.datasets[0].data.shift(); // apagar o primeiro de temperatura
          dadosC.datasets[0].data.push(novoRegistro.cpu_totem_em_uso); // incluir uma nova leitura de temperatura

          console.log("meu totem é o " + id_historico);

          window.grafico_linhaC.update();

          proximaAtualizacaoC = setTimeout(
            () => atualizarGraficoC(id_historico, dadosC),
            5000
          );
        });
      } else {
        console.error("Nenhum dado encontrado ou erro na API");
        proximaAtualizacaoC = setTimeout(
          () => atualizarGraficoC(id_historico, dadosC),
          5000
        );
      }
    })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function atualizarGraficoM(id_historico, dadosM) {
  console.log("executei atualizarGraficoM");
  fetch(`/leituras/ultimas/${id_historico}`, { cache: "no-store" })
    .then(function (response) {
      console.log("Estou tentando pegar id_historico da Memoria = ", id_historico);
      if (response.ok) {
        response.json().then(function (novoRegistro) {
          console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
          console.log(`Dados atuais do gráfico: ${dadosM}`);

          // tirando e colocando valores no gráfico
          dadosM.labels.shift(); // apagar o primeiro
          dadosM.labels.push(novoRegistro.momento_grafico); // incluir um novo momento
          dadosM.datasets[0].data.shift(); // apagar o primeiro de umidade
          dadosM.datasets[0].data.push(novoRegistro.memoria_em_uso); // incluir uma nova leitura de umidade

          console.log("meu totem é o " + id_historico);

          window.grafico_linhaM.update();

          proximaAtualizacaoM = setTimeout(
            () => atualizarGraficoM(id_historico, dadosM),
            5000
          );
        });
      } else {
        console.error("Nenhum dado encontrado ou erro na API");
        proximaAtualizacaoM = setTimeout(
          () => atualizarGraficoM(id_historico, dadosM),
          5000
        );
      }
    })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

// só altere aqui se souber o que está fazendo!
function plotarGraficoC(dadosC, id_historico) {
  console.log("executei plotarGrafico");
  console.log("iniciando plotagem do gráfico...");

  var ctx = myChartArea.getContext("2d");
  window.grafico_linhaC = Chart.Line(ctx, {
    data: dadosC,
    options: configurarGraficoC()
  });

  setTimeout(() => atualizarGraficoC(id_historico, dadosC), 5000);
}

function plotarGraficoM(dadosM, id_historico) {
  console.log("executei plotarGraficoM");
  console.log("iniciando plotagem do gráfico...");

  var ctx = myChartPie.getContext("2d");
  window.grafico_linhaM = Chart.Line(ctx, {
    data: dadosM,
    options: configurarGraficoM()
  });

  setTimeout(() => atualizarGraficoM(id_historico, dadosM), 5000);
}

// Alertas

 function sendData() {
   var http = new XMLHttpRequest();
   http.open("GET", "http://localhost:9001/api/sendData", false);
   http.send(null);
 }

// Descomente abaixo se quiser inserir dados a cada X segundos
setInterval(() => {

}, 5000);
