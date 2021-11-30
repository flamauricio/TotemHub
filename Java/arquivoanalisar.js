	var graf_regiao = document.getElementById("chart_temp_regiao").getContext("2d")
	var graf_alertas = document.getElementById("chart_alertas").getContext("2d")
	var graf_mercado = document.getElementById("chart_mercado").getContext("2d")
	var graf_peixe_x_perda = document.getElementById("chart_peixe_x_perda").getContext("2d")

	var chart_regiao = new Chart(graf_regiao, conf_1)
	var chart_alertas = new Chart(graf_alertas, conf_2)
	var chart_mercado = new Chart(graf_mercado, conf_3)
	var chart_peixe_x_perda = new Chart(graf_peixe_x_perda, conf_4)

	let proximaAtualizacao;

	window.onload = obterDadosGraficoPrimeiraVez(1);

	function configurarGrafico() {
		console.log("executei configurarGrafico")
		var configuracoes = {
			responsive: true,
			animation: { duration: 500 },
			hoverMode: 'index',
			stacked: false,
			title: {
				display: true,
				text: 'Histórico recente de temperatura e umidade'
			},
			scales: {
				yAxes: [{
					type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
					display: true,
					position: 'left',
					id: 'y-temperatura',
				}, {
					type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
					display: true,
					position: 'right',
					id: 'y-umidade',

					// grid line settings
					gridLines: {
						drawOnChartArea: false, // only want the grid lines for one axis to show up
					},
				}],
			}
		};

		return configuracoes;
	}


	// altere aqui como os dados serão exibidos
	// e como são recuperados do BackEnd
	function obterDadosGraficoPrimeiraVez(id_sensor) {
		console.log("executei obterDadosGraficoPrimeiraVez")

		if (proximaAtualizacao != undefined) {
			clearTimeout(proximaAtualizacao);
		}

		fetch(`/leituras/ultimas/${id_sensor}`, { cache: 'no-store' }).then(function (response) {
			if (response.ok) {
				response.json().then(function (resposta) {
					console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
					resposta.reverse();

					var dados = {
						labels: [],
						datasets: [
							{
								yAxisID: 'y-temperatura',
								label: 'Temperatura',
								borderColor: '#267667',
								backgroundColor: '#000',
								fill: false,
								data: []
							}
						]
					};
					for (i = 0; i < resposta.length; i++) {
						var registro = resposta[i];
						dados.labels.push(registro.momento_grafico);
						dados.datasets[0].data.push(registro.temp_sen);

					}
					console.log(JSON.stringify(dados));
					plotarGrafico(dados, id_sensor);
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
	function atualizarGrafico(id_sensor, dados) {
		console.log("executei atualizarGrafico")
		fetch(`/leituras/tempo-real/${id_sensor}`, { cache: 'no-store' }).then(function (response) {
			console.log("Estou tentando pegar id_sensor = ", id_sensor)
			if (response.ok) {
				response.json().then(function (novoRegistro) {

					console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
					console.log(`Dados atuais do gráfico: ${dados}`);

					// tirando e colocando valores no gráfico
					dados.labels.shift(); // apagar o primeiro
					dados.labels.push(novoRegistro.momento_grafico); // incluir um novo momento
					dados.datasets[0].data.shift();  // apagar o primeiro de temperatura
					dados.datasets[0].data.push(novoRegistro.temp_sen); // incluir uma nova leitura de temperatura

					var status_tanq = novoRegistro.temp_sen
					
					temp_atual.innerHTML = novoRegistro.temp_sen
					if (status_tanq <= 11) {
						status_t.innerHTML = "<b style='color:rgb(32, 124, 245);'>Extremo!!</b>"
						status_s.innerHTML = `<b style='color:green;'>ON</b>`
						img_alerta.src = "CSS/img-dash/extremo_gelado.png"
					}
					else if (status_tanq >= 30) {
						status_t.innerHTML = "<b style='color:red;'>Extremo!!</b>"
						status_s.innerHTML = `<b style='color:green;'>ON</b>`
						img_alerta.src = "CSS/img-dash/extremo_quente.png"
					}
					else if (status_tanq >= 16 && status_tanq <= 23) {
						status_t.innerHTML = "<b style='color:green;'>OK!</b>"
						status_s.innerHTML = `<b style='color:green;'>ON</b>`
						img_alerta.src = "CSS/img-dash/sinal_ok.png"
					} 
					else if (status_tanq >= 24.57) {
						status_t.innerHTML = "<b style='color:#f8d71a;'>Alerta!</b>"
						status_s.innerHTML = `<b style='color:green;'>ON</b>`
						img_alerta.src = "CSS/img-dash/alerta_laranja.png"
						
					}
					else if (status_tanq <= 15.02) {
						status_t.innerHTML = "<b style='color:#f8d71a;'>Alerta!</b>"
						status_s.innerHTML = `<b style='color:green;'>ON</b>`
						img_alerta.src = "CSS/img-dash/alerta_azul.png"
						
					}
					else {
						status_s.innerHTML = `<b style='color:red;'>OFF</b>`
					}

					console.log("meu sensor é o " + id_sensor)

					window.grafico_linha.update();
					proximaAtualizacao = setTimeout(() => atualizarGrafico(id_sensor, dados), 2000);
				});
			} else {
				console.error('Nenhum dado encontrado ou erro na API');
				proximaAtualizacao = setTimeout(() => atualizarGrafico(id_sensor, dados), 2000);
			}
		})
			.catch(function (error) {
				console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
			});

	}

	// só altere aqui se souber o que está fazendo!
	function plotarGrafico(dados, id_sensor) {
		console.log("executei plotarGrafico")
		console.log('iniciando plotagem do gráfico...');

		var ctx = grafico_principal.getContext("2d");
		window.grafico_linha = Chart.Line(ctx, {
			data: dados,
			options: configurarGrafico()
		});

		setTimeout(() => atualizarGrafico(id_sensor, dados), 2000);
	}


	function sendData() {
		var http = new XMLHttpRequest();
		http.open('GET', 'http://localhost:9001/api/sendData', false);
		http.send(null);
	}

	// Descomente abaixo se quiser inserir dados a cada X segundos
	setInterval(() => {
		sendData();
	}, 2000);

<script src="funcoes.js"></script>