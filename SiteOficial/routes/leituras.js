var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Leitura = require('../models').Leitura;
var env = process.env.NODE_ENV || 'development';

/* Recuperar as últimas N leituras */
router.get('/ultimas/:id_historico', function(req, res, next) {
	
	// quantas são as últimas leituras que quer? 7 está bom?
	const limite_linhas = 7;

	var id_leitura = req.params.id_historico;

	console.log(`Recuperando as ultimas ${limite_linhas} leituras`);
	
	let instrucaoSql = "";

	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `select 
		temperatura, 
		umidade, 
		DATE_FORMAT(data_leitura,'%H:%i:%s') as momento_grafico
		from controle
		where fk_sensor = ${id_leitura}
		order by id_leitura desc limit ${limite_linhas}`;
	} else if (env == 'production') {
		//abaixo, escreva o select de dados para o SQL Server
		instrucaoSql = `SELECT TOP ${limite_linhas} 
		cpu_totem, 
		memoria_ram_totem, 
		funcionamento_totem,
        horario_totem
		FORMAT(horario_totem,'HH:mm:ss') AS momento_grafico
		FROM leitura
		WHERE fk_totem = ${id_leitura}
		ORDER BY id desc`;
	} else {
		console.log("\n\n\n\nVERIFIQUE O VALOR DE LINHA 1 EM APP.JS!\n\n\n\n")
	}
	
	sequelize.query(instrucaoSql, {
		model: Leitura,
		mapToModel: true 
	})
	.then(resultado => {
		console.log(`Encontrados: ${resultado.length}`);
		res.json(resultado[0]);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});


router.get('/cliente/:id_historico', function(req, res, next) {
	console.log('Recuperando Totem');
	
	//var id_leitura = req.body.id_leitura; // depois de .body, use o nome (name) do campo em seu formulário de login
	var id_leitura = req.params.id_historico;
	
	let instrucaoSql = "";
	
	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `select temperatura, umidade, DATE_FORMAT(data_leitura,'%H:%i:%s') as momento_grafico, fk_sensor 
						from controle where fk_sensor = ${id_leitura} order by id_leitura desc limit 1`;
	} else if (env == 'production') {
		// abaixo, escreva o select de dados para o SQL Server
		instrucaoSql = `SELECT TOP 1 cpu_totem, memoria_ram_totem, FORMAT(horario_totem,'HH:mm:ss') AS momento_grafico, fk_totem 
						FROM historico_totem WHERE fk_agente = ${id_leitura} ORDER BY id DESC`;
	} else {
		console.log("\n\n\n\nVERIFIQUE O VALOR DE LINHA 1 EM APP.JS!\n\n\n\n")
	}
	
	console.log(instrucaoSql);
	
	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
	.then(resultado => {
		res.json(resultado[0]);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

// estatísticas (max, min, média, mediana, quartis etc)
router.get('/estatisticas', function (req, res, next) {
	
	console.log(`Recuperando as dados atuais`);

	const instrucaoSql = `select 
							max(cpu_totem) as cpu_maxima, 
							min(cpu_totem) as cpu_minima, 
							avg(cpu_totem) as cpu_media,
							max(memoria_totem) as memoria_maxima, 
							min(memoria_totem) as memoria_minima, 
							avg(memoria_totem) as memoria_media 
						from historico_totem`;
					

	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
		.then(resultado => {
			res.json(resultado[0]);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		});
  
});


module.exports = router;